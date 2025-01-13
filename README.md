# projeto-final-pos-2024
Projeto Final da disciplina de POS

## Grupo

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/dvanael" title="Anael Barbosa">
        <img src="https://avatars.githubusercontent.com/dvanael" width="100px;" alt="collaborators pictures"/><br>
        <sub>
          <b>Anael Barbosa</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Thaynix" title="Thaisy Juliany">
        <img src="https://avatars.githubusercontent.com/Thaynix" width="100px;" alt="collaborators pictures"/><br>
        <sub>
          <b>Thaisy Juliany</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## Instalação

### Serviço

Siga os seguintes passos para rodar o serviço localmente.

- Crie um ambiente virtual python

```bash
python -m venv .venv
```

- Ative o ambiente virtual

*powershell*
```powershell
.venv/Scripts/activate
```

- Instale as dependências do projeto

```bash
pip install -r service/requirements.txt
```

- Faça as migrações

```bash
python service/manage.py migrate
```

- Teste o serviço localmente, [localhost:8000](http://localhost:8000)

```bash
python service/manage.py runserver
```

### Cliente

Com o serviço rodando, é possível rodar o cliente localmente criando um servidor web com Python.

- No terminal, entre na pasta `client/`

```bash
cd ./client/
```

- Crie um servidor web com Python, use uma porta **diferente** da porta usada no serviço

```bash
python -m http.server 8888
```

Alternamente, se estiver usando o VSCode, é possível abrir um servidor com a extensão [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

---
