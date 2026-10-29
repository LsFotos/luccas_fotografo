# LS Fotografia — site de links e portfólio

Site estático feito com HTML, CSS e JavaScript, pronto para publicar no GitHub Pages.

## 1. Personalize os links

Abra `script.js` e edite o objeto `CONFIG` no começo do arquivo:

- `whatsappNumber`: seu número com DDI e DDD, apenas números. Exemplo de formato: `5511999999999`.
- `instagramUrl`: endereço completo do seu Instagram.
- `tiktokUrl`: endereço completo do seu TikTok.
- `whatsappMessage`: mensagem que aparecerá preenchida ao abrir a conversa.

Não deixe os valores de exemplo antes de publicar.

## 2. Adicione suas fotografias

Coloque até sete imagens na pasta `assets`, com estes nomes:

- `foto-01.jpg`
- `foto-02.jpg`
- `foto-03.jpg`
- `foto-04.jpg`
- `foto-05.jpg`
- `foto-06.jpg`
- `foto-07.jpg`

Pode usar JPG. Se tiver menos de sete fotos, tudo bem: o site mostra apenas as imagens que existirem. Para usar PNG ou WebP, altere também o nome no `index.html`.

Para a galeria carregar mais rápido, as miniaturas ficam em `assets/thumbnails`, com os mesmos nomes. Ao trocar uma foto, atualize também a miniatura correspondente, redimensionada para no máximo 1200 px. Se ela não existir, o site usa o original automaticamente, mas a galeria pode demorar mais.

Use fotografias que você tenha autorização para publicar, especialmente em trabalhos com crianças.

## 3. Teste no computador

Abra `index.html` no navegador. Para testar os links corretamente, configure primeiro o arquivo `script.js`.

## 4. Publique no GitHub Pages

1. Entre no GitHub e crie um repositório público chamado `ls-fotografia` (ou outro nome).
2. Envie `index.html`, `style.css`, `script.js`, `README.md` e a pasta `assets`.
3. No repositório, vá em **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)` e clique em **Save**.
6. Aguarde o GitHub publicar. O endereço aparecerá na própria página de configurações do Pages.

## Arquivos

- `index.html`: conteúdo e estrutura da página.
- `style.css`: visual responsivo e animações leves.
- `script.js`: links configuráveis, mensagem do WhatsApp e exibição da galeria.
- `assets/`: originais das fotografias e miniaturas otimizadas em `assets/thumbnails/`.
