# Hosting Guide — Anubhav / Guide Guru Global

Is project me 3 alag cheezein hain jo deploy karni hain:
1. **Frontend** — ye Next.js repo (jisme hum kaam kar rahe hain)
2. **Backend** — Flask API (alag repo, is repo me nahi hai)
3. **Database** — MySQL

Ye guide teeno ko production me le jaane ke liye hai — kitna VPS chahiye,
frontend-backend kaise connect honge, DB kaise setup hoga, aur auth/session
(cookies wala sawaal) kaise kaam karta hai is app me.

---

## 1. Recommended setup (sabse kam jhanjhat)

**Frontend → Vercel (free/cheap), Backend + MySQL → ek VPS.**

Next.js App Router (jo ye project use karta hai) Vercel ke liye hi bana
hai — free tier me hi SSL, CDN, auto-deploy-on-git-push sab mil jaata hai,
koi server manage nahi karna padta. Sirf backend (Flask + MySQL) ke liye
VPS chahiye.

```
User's browser
      │
      ├──► yourdomain.com           (Vercel — this Next.js frontend)
      │
      └──► api.yourdomain.com       (Your VPS — Flask + MySQL)
```

Agar Vercel use nahi karna (poora control apne VPS pe chahiye), section 6
me "Sab kuch ek VPS pe" wala alternative bhi diya hai — bas thoda zyada
setup/maintenance khud karna padega (Nginx, SSL renewal, process manager,
sab manually).

---

## 2. Kitna VPS chahiye

Ye ek boutique-hotel QR-based guest app hai — ek waqt me sath-sath sirf
hotel ke guests hi use karenge (maan lo max 50-100 log ek din me, spikes
mein bhi kaafi kam). High-traffic viral app nahi hai, isliye bada server
nahi chahiye.

| Spec | Kaam aayega |
|---|---|
| **Minimum** — 1 vCPU, 2 GB RAM, 40 GB SSD | Flask + MySQL, chhoti property ke liye — jaise DigitalOcean/Hetzner ka ~$6-8/mo droplet |
| **Recommended** — 2 vCPU, 4 GB RAM, 80 GB SSD | Comfortable headroom — MySQL + Flask + Nginx + SSL certs sab aaram se, ~$12-24/mo |
| **Agar frontend bhi isi VPS pe** (Vercel use nahi kar rahe) | 4 GB minimum, 8 GB better — Next.js build process khud kaafi RAM leta hai |

Providers: **Hetzner** (sabse sasta, achha), **DigitalOcean**, **Linode**,
**AWS Lightsail** — koi bhi chalega, sab similar hain is scale pe. Ubuntu
22.04 LTS OS lena, sabse zyada documented/supported hai.

Jab traffic genuinely badhne lage (multiple properties, marketing push),
tab upgrade karna — MySQL ko managed DB service (DigitalOcean Managed
MySQL / AWS RDS) pe move karna easiest first scaling step hota hai.

---

## 3. Domain & DNS

1. Ek domain kharido (Namecheap, GoDaddy, Cloudflare Registrar — koi bhi).
2. DNS me do records banao:
   - `yourdomain.com` → Vercel (Vercel khud instructions deta hai — A
     record ya CNAME, exact value unke dashboard me milta hai)
   - `api.yourdomain.com` → apne VPS ka IP address (A record)
3. **`www.yourdomain.com` bhi Vercel ki taraf redirect kar do** (Vercel
   dashboard me "Domains" section me ek click me ho jaata hai).

---

## 4. Frontend deploy karna (Vercel)

1. Is repo ko GitHub pe push karo (agar pehle se nahi hai).
2. [vercel.com](https://vercel.com) pe jaake GitHub se login karo, "Import
   Project" → ye repo select karo. Framework auto-detect ho jayega
   (Next.js).
3. **Environment Variables** section me exactly ye do daalo:
   ```
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=<Cloudflare Turnstile site key, agar use kar rahe ho>
   ```
   ⚠️ **Ye critical hai:** `NEXT_PUBLIC_API_URL` build-time pe read hota
   hai — `next.config.ts` isi se CSP headers (`connect-src`, `img-src`)
   aur allowed image domains bana leta hai (dekho `next.config.ts` ka
   `apiOrigin` logic). Iska matlab: **backend ka URL badalne pe naya
   deploy chahiye hoga**, sirf env var change karke restart karne se kaam
   nahi chalega — Vercel me env var change karne pe wo khud redeploy
   trigger karta hai, so this is automatic, bas dhyan rakhna.
4. Deploy dabao. Har `git push` pe apne aap naya deployment ban jayega.
5. Custom domain "Domains" tab me add karo (`yourdomain.com`).

Ho gaya — frontend live hai, SSL automatic, CDN automatic.

---

## 5. Backend + MySQL deploy karna (VPS)

Ye steps Flask backend ke liye hain (jo alag repo me hai, lekin isi VPS pe
chalega). High-level flow:

### 5.1 VPS basic setup
```bash
# SSH karke VPS pe login karo, phir:
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3-pip python3-venv nginx mysql-server ufw

# Firewall — sirf SSH, HTTP, HTTPS bahar se accessible hone chahiye
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 5.2 MySQL setup
```bash
sudo mysql_secure_installation   # root password set karo, defaults theek hain

sudo mysql -u root -p
```
```sql
CREATE DATABASE anubhav CHARACTER SET utf8mb4;
CREATE USER 'anubhav_app'@'localhost' IDENTIFIED BY '<strong-random-password>';
GRANT ALL PRIVILEGES ON anubhav.* TO 'anubhav_app'@'localhost';
FLUSH PRIVILEGES;
```

⚠️ **MySQL ka port (3306) kabhi bhi publicly expose mat karo.** Firewall
me sirf 22/80/443 khula rakho (upar wale `ufw` commands yehi karte hain).
Flask usi VPS pe chalega, so `localhost` se hi connect karega — bahar se
kisi ko MySQL tak pahunchne ki zaroorat nahi.

`DATABASE_URL` (Flask ke `.env` me) kuch aisa banega:
```
DATABASE_URL=mysql://anubhav_app:<password>@localhost:3306/anubhav
```

**Backup:** ek daily cron job laga do —
```bash
# /etc/cron.daily/mysql-backup (executable banao: chmod +x)
#!/bin/bash
mysqldump -u anubhav_app -p'<password>' anubhav | gzip > /var/backups/anubhav-$(date +%F).sql.gz
find /var/backups -name "anubhav-*.sql.gz" -mtime +14 -delete
```

### 5.3 Flask app setup
```bash
cd /var/www
git clone <backend-repo-url> anubhav-backend
cd anubhav-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn
```

`.env` file banao (BACKEND_GUIDE.md section 5 me poori list hai):
```
DATABASE_URL=mysql://anubhav_app:<password>@localhost:3306/anubhav
JWT_SECRET=<random 32+ char string — `openssl rand -hex 32` se generate karo>
TURNSTILE_SECRET_KEY=<Cloudflare se>
SMTP_HOST=...
SMTP_PORT=587
SMTP_USERNAME=...
SMTP_PASSWORD=...
SMTP_FROM=...
SMTP_USE_TLS=true
```

Migrations chalao (jo bhi tool use kar rahe ho — Alembic/Flask-Migrate),
phir pehla admin banao:
```bash
flask create-admin --name "Your Name" --email you@example.com --role super_admin
```

### 5.4 Gunicorn ko systemd service banao

`/etc/systemd/system/anubhav-backend.service`:
```ini
[Unit]
Description=Anubhav Flask backend
After=network.target mysql.service

[Service]
User=www-data
WorkingDirectory=/var/www/anubhav-backend
Environment="PATH=/var/www/anubhav-backend/venv/bin"
EnvironmentFile=/var/www/anubhav-backend/.env
ExecStart=/var/www/anubhav-backend/venv/bin/gunicorn --workers 3 --bind 127.0.0.1:8000 app:app
Restart=always

[Install]
WantedBy=multi-user.target
```
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now anubhav-backend
sudo systemctl status anubhav-backend   # check it's running
```

### 5.5 Nginx reverse proxy + SSL

`/etc/nginx/sites-available/api.yourdomain.com`:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
```bash
sudo ln -s /etc/nginx/sites-available/api.yourdomain.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Free SSL cert (auto-renews):
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

Ab `https://api.yourdomain.com` live hai, HTTPS ke saath.

---

## 6. Frontend ↔ Backend connect kaise hoga

Do cheezein sync honi chahiye, dono taraf:

1. **Frontend:** `NEXT_PUBLIC_API_URL=https://api.yourdomain.com` (Vercel
   env var, section 4 me set kiya).
2. **Backend CORS:** Flask ko `https://yourdomain.com` (aur agar `www.`
   bhi use hoga to `https://www.yourdomain.com`) explicitly allow karna
   hoga apne CORS config me. Is session me hi ek CORS issue mila tha jab
   `127.0.0.1` vs `localhost` mismatch ho gaya tha (dekho
   `BACKEND_ISSUE_CORS.md`) — production me bhi yehi cheez matter karti
   hai: jo bhi **exact** origin browser address bar me dikhega, wahi
   backend ke allow-list me hona chahiye, protocol (`https://`) samet.

   ```python
   CORS(app, origins=[
       "https://yourdomain.com",
       "https://www.yourdomain.com",
   ])
   ```

Dono set ho jaayein, phir browser me `https://yourdomain.com` khol ke
admin login try karo — agar CORS sahi hai to koi console error nahi
aayega.

---

## 7. "Cookies" — is app me session kaise kaam karta hai

Seedha jawab: **ye app cookies use hi nahi karta.**

Admin login hone ke baad, backend ek JWT token deta hai
(`POST /api/v1/admin/auth/login` → `access_token`). Frontend
(`services/admin/authService.ts`) usko **`localStorage`/`sessionStorage`**
me store karta hai (browser storage, cookie nahi), aur har admin API call
ke saath `Authorization: Bearer <token>` header me bhej deta hai.

Isliye:
- Koi cookie config (`SameSite`, `Secure`, `HttpOnly`) set karne ki
  zaroorat nahi hai — na frontend me, na backend me, kyunki koi cookie
  set hi nahi ho rahi.
- Sirf ek cheez zaroori hai: **production HTTPS pe honi chahiye**
  (Vercel + Certbot dono automatically de dete hain upar). HTTP pe
  `Authorization` header bhejna insecure hota hai — HTTPS enforce karo.
- `SECURITY_AUDIT.md` (2026-08-11 wala) me likha hai "No localStorage use
  anywhere" — ye us waqt sahi tha, lekin us audit ke baad admin panel
  banaya gaya jo localStorage use karta hai token store karne ke liye.
  Vo doc ab thoda stale hai is point pe — koi security issue nahi hai,
  bas documentation update pending hai.

Agar future me cookie-based session chahiye (thoda zyada secure against
XSS, kyunki JS `HttpOnly` cookie read nahi kar sakta), wo ek architecture
change hoga — abhi jo bana hai wo localStorage + Bearer token hai, aur
production ke liye bilkul theek hai jab tak HTTPS use ho raha hai.

---

## 8. Deploy order (step-by-step)

1. Domain kharido, DNS records banao (section 3)
2. VPS provision karo, MySQL + Flask setup karo (section 5)
3. Backend CORS me production frontend origin add karo (section 6)
4. Pehla admin user banao (`flask create-admin`)
5. Vercel pe frontend deploy karo, env vars set karo (section 4)
6. Test: `https://yourdomain.com` khol ke poora guest flow try karo
   (browse → book → query → contact), phir `/dashboard/super-admin/login`
   se admin login try karo
7. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` set karna ho to Cloudflare Turnstile
   pe production domain add karo, key le ke Vercel env var me daalo,
   redeploy

---

## 9. Alternative — sab kuch ek hi VPS pe (Vercel nahi)

Agar poora control chahiye ya Vercel use nahi karna:

1. Section 5 wale steps se VPS setup karo, plus:
   ```bash
   sudo apt install -y nodejs npm   # ya nvm se latest LTS
   cd /var/www
   git clone <this-frontend-repo-url> anubhav-frontend
   cd anubhav-frontend
   npm install
   ```
2. `.env.local` banao:
   ```
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
   ```
3. Build karo: `npm run build`
4. Process manager se chalao (PM2 recommended, ya systemd service jaisa
   backend ke liye banaya):
   ```bash
   npm install -g pm2
   pm2 start npm --name anubhav-frontend -- start
   pm2 startup   # boot pe auto-start
   pm2 save
   ```
5. Nginx me ek aur server block banao `yourdomain.com` ke liye, jo
   `127.0.0.1:3000` (Next.js ka default port) pe proxy kare — same
   pattern jaisa section 5.5 me `api.yourdomain.com` ke liye kiya.
6. `sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com`

Nuksaan: har `git pull` ke baad manually `npm run build` + `pm2 restart`
karna padega, koi CDN nahi, koi auto-scaling nahi. Isiliye Vercel
recommended hai — same result, zero maintenance.

---

## Quick reference — env vars checklist

**Frontend (Vercel dashboard, ya `.env.local` agar VPS pe):**
```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<optional>
```

**Backend (VPS `.env`, kabhi bhi frontend repo/Vercel me nahi):**
```
DATABASE_URL=mysql://anubhav_app:<password>@localhost:3306/anubhav
JWT_SECRET=<random>
TURNSTILE_SECRET_KEY=<optional>
SMTP_HOST=, SMTP_PORT=, SMTP_USERNAME=, SMTP_PASSWORD=, SMTP_FROM=, SMTP_USE_TLS=
```

See `BACKEND_GUIDE.md` section 5 for the full backend env var list, and
`API_INTEGRATION.md` for what each frontend service expects once
`NEXT_PUBLIC_API_URL` is set.
