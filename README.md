# 🎅 Ziemassvētku Vecītis - Dāvanu Palīgs

Interaktīvs tīmekļa čatbots, kas darbojas kā Ziemassvētku Vecītis un palīdz izvēlēties ideālu PlayStation 5 spēli dāvanā. Viss saskarnes un saziņas teksts ir latviskā valodā.

## ✨ Funkcijas

- 🎄 Dabiska saziņa ar Ziemassvētku Vecīti latviešu valodā
- 🤖 ChatGPT API integrācija inteliģentām sarunām
- 🎮 Četru PS5 spēļu izvēle: NHL 2026, FC 2026, Minecraft, Spiderman 2
- 📧 Automātiska e-pasta nosūtīšana, kad dāvana ir izvēlēta
- ❄️ Ziemassvētku tēmas dizains ar sniega animāciju
- 📱 Responsīvs dizains visām ierīcēm

## 🚀 Uzstādīšana

### 1. Projekta lejupielāde

```bash
git clone https://github.com/your-username/Christmas_chat.git
cd Christmas_chat
```

### 2. API atslēgu konfigurēšana

#### OpenAI API atslēga (ChatGPT)

1. Doties uz [OpenAI Platform](https://platform.openai.com/api-keys)
2. Izveidot jaunu API atslēgu
3. Nokopēt atslēgu

#### EmailJS konfigurācija

1. Reģistrēties [EmailJS](https://www.emailjs.com/)
2. Izveidot jaunu e-pasta servisu (piemēram, Gmail)
3. Izveidot e-pasta šablonu ar šādiem parametriem:
   - `{{to_email}}` - saņēmēja e-pasts
   - `{{gift_name}}` - izvēlētās dāvanas nosaukums
   - `{{user_name}}` - lietotāja vārds
   - `{{message}}` - ziņojums
   - `{{timestamp}}` - laika zīmogs

4. Iegūt:
   - Service ID
   - Template ID
   - Public Key

#### Konfigurācijas faila rediģēšana

Atvērt `config.public.js` un aizstāt EmailJS vērtības:

```javascript
window.CONFIG = {
    EMAILJS_SERVICE_ID: 'service_xxxxxxx',
    EMAILJS_TEMPLATE_ID: 'template_xxxxxxx',
    EMAILJS_PUBLIC_KEY: 'xxxxxxxxxxxxxxx',
    RECIPIENT_EMAIL: 'your-email@example.com'
};
```

### 3. EmailJS SDK pievienošana

Pievienot EmailJS SDK bibliotēku `index.html` failā pirms `</body>` taga:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script src="config.public.js"></script>
<script src="script.js"></script>
```

## ▲ Izvietošana Vercel (ieteicams)

Šī versija izmanto `POST /api/chat` (serverless) un **neglabā OpenAI atslēgu pārlūkprogrammā**.

1. Ieliec repozitoriju GitHub.
2. Importē projektu Vercel.
3. Vercel → Project Settings → Environment Variables:
    - `OPENAI_API_KEY` = tavs OpenAI API key
    - (neobligāti) `OPENAI_MODEL` = piemēram `gpt-4o`
4. Deploy.

## 🌐 Izvietošana GitHub Pages

### 1. Repozitorija izveide

```bash
git init
git add .
git commit -m "Initial commit: Santa Claus chatbot"
```

### 2. Publicēšana GitHub

```bash
git remote add origin https://github.com/your-username/Christmas_chat.git
git branch -M main
git push -u origin main
```

### 3. GitHub Pages aktivizēšana

1. Doties uz repozitorija Settings
2. Kreisajā izvēlnē izvēlēties "Pages"
3. Source: izvēlēties "Deploy from a branch"
4. Branch: izvēlēties `main` un `/ (root)`
5. Saglabāt

Vietne būs pieejama: `https://your-username.github.io/Christmas_chat/`

## ⚠️ SVARĪGI: Drošība

**NEKAD nepublicēt OpenAI API atslēgu publiskā repozitorijā!**

### Risinājumi:

#### Opcija 1: .gitignore (Ieteicams lokālai izstrādei)

Izveidot `.gitignore` failu:

```
config.js
```

Un izveidot `config.example.js`:

```javascript
window.CONFIG = {
    EMAILJS_SERVICE_ID: 'YOUR_EMAILJS_SERVICE_ID_HERE',
    EMAILJS_TEMPLATE_ID: 'YOUR_EMAILJS_TEMPLATE_ID_HERE',
    EMAILJS_PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY_HERE',
    RECIPIENT_EMAIL: 'your-email@example.com'
};
```

#### Opcija 2: Lietotāja ievadītas atslēgas

Mainīt aplikāciju, lai lietotājs ievadītu savas API atslēgas tīmekļa saskarnē (saglabājot tās tikai localStorage).

#### Opcija 3: Backend serveris

Izveidot backend servisu (piemēram, Node.js ar Express), kas apstrādā API pieprasījumus un glabā atslēgas drošā vidē.

## 📝 Lietošana

1. Atvērt `index.html` pārlūkprogrammā vai apmeklēt GitHub Pages vietni
2. Sākt sarunu ar Ziemassvētku Vecīti
3. Atbildēt uz jautājumiem par spēļu preferencēm
4. Noklikšķināt uz izvēlētās spēles vai rakstīt ziņu
5. Kad dāvana ir izvēlēta, automātiski tiek nosūtīts e-pasts

## 🎮 Pieejamās Dāvanas

- **NHL 2026** 🏒 - Hokeja spēle
- **FC 2026** ⚽ - Futbola spēle
- **Minecraft** 🧱 - Radošā spēle
- **Spiderman 2** 🕷️ - Piedzīvojumu spēle

## 🛠️ Tehnoloģijas

- HTML5
- CSS3 (ar animācijām)
- JavaScript (ES6+)
- OpenAI ChatGPT API (gpt-3.5-turbo)
- EmailJS

## 📱 Saderība

- Chrome, Firefox, Safari, Edge (jaunākās versijas)
- Mobilās ierīces un planšetdatori
- Responsīvs dizains

## 🤝 Ieguldījums

Ja vēlaties uzlabot šo projektu:

1. Fork repozitoriju
2. Izveidot jaunu branch (`git checkout -b feature/AmazingFeature`)
3. Commit izmaiņas (`git commit -m 'Add some AmazingFeature'`)
4. Push uz branch (`git push origin feature/AmazingFeature`)
5. Atvērt Pull Request

## 📄 Licenece

Šis projekts ir brīvi pieejams personiskai un izglītojošai lietošanai.

## 💡 Idejas turpmākai attīstībai

- [ ] Vairāku valodu atbalsts
- [ ] Dāvanu saraksta paplašināšana
- [ ] Lietotāja profils un dāvanu vēsture
- [ ] Integrācija ar e-veikaliem
- [ ] Balss saziņa
- [ ] Admin panelis dāvanu pārvaldībai

## 📞 Kontakti

Ja ir jautājumi vai ierosinājumi, lūdzu, izveidojiet Issue vai sazinieties ar mani.

---

**Priecīgus Ziemassvētkus! Ho ho ho! 🎅🎄**
