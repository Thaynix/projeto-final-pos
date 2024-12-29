# projeto-final-pos-2024
Projeto Final da disciplina de POS


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

---
