# Momentum

## Introdução

O aplicativo "Momentum" propõe-se como muito mais do que uma simples ferramenta de anotações, trata-se de uma solução inovadora para transformar a experiência de registrar ideias, organizar tarefas e estruturar pensamentos de modo interativo e fluido. Com design intuitivo e funcionalidades modernas, "Momentum" oferece uma abordagem que transcende o convencional, tornando cada anotação um momento de autoconhecimento e clareza.

O principal objetivo deste projeto é reinventar o ato de fazer anotações, tornando-o mais envolvente, dinâmico e adaptado ao dia a dia contemporâneo. Buscando desfazer a imagem tradicional e estática do bloco de notas, "Momentum" incorpora recursos que promovem interatividade e praticidade, convidando o usuário a construir seus registros de forma personalizada e significativa.

A justificativa para o desenvolvimento do "Momentum" está fundamentada na necessidade crescente de ferramentas digitais que acompanhem o ritmo acelerado da vida moderna, aliando facilidade de uso a um visual agradável. Ao investir em inovação, funcionalidade e usabilidade, o aplicativo se diferencia ao proporcionar não apenas organização, mas também inspiração, o que torna o simples ato de anotar em um verdadeiro momento de transformação pessoal.

## Funcionalidades

### Notas
- Criar, editar e deletar notas
- Visualização em grade (2 colunas)
- Persistência de dados local com AsyncStorage
- Interface estilo Obsidian com tema escuro

### Tarefas
- Criar, editar e deletar tarefas
- Adicionar itens de checklist em cada tarefa
- Marcar/desmarcar itens como completos
- Visualização de progresso com barra de completude
- Deletar itens individuais

## Estrutura do Projeto

```
momentum/
├── app/                    # Páginas da aplicação (Expo Router)
│   ├── _layout.tsx        # Layout raiz com providers
│   ├── index.tsx          # Tela inicial/landing page
│   ├── notes.tsx          # Lista de notas
│   ├── note-page.tsx      # Visualização/edição de nota
│   ├── tasks.tsx          # Lista de tarefas
│   └── task-page.tsx      # Visualização/edição de tarefa
├── components/            # Componentes reutilizáveis
│   ├── card.tsx          # Card para notas
│   └── task-card.tsx     # Card para tarefas
├── contexts/              # Context API
│   ├── NotesContext.tsx  # Gerenciamento de estado de notas
│   └── TasksContext.tsx  # Gerenciamento de estado de tarefas
├── hooks/                 # Hooks customizados
│   ├── useNotes.ts       # Hook para acessar notas
│   └── useTasks.ts       # Hook para acessar tarefas
├── types/                 # Definições de tipos TypeScript
│   └── index.ts          # Interfaces Note, Task, TaskItem
└── styles/               # Estilos globais
    └── global.tsx        # Cores, espaçamento e tipografia
```

## Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **Expo Router** - Navegação baseada em arquivos
- **TypeScript** - Tipagem estática
- **AsyncStorage** - Persistência de dados local
- **Context API** - Gerenciamento de estado global
- **Lucide React Native** - Ícones

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Padrões de Código

- **Componentes funcionais** com Hooks
- **TypeScript** para tipagem forte
- **Context API** para estado global
- **Custom Hooks** para lógica reutilizável
- **Memoização** para otimização de performance
- **Design System** com estilos globais consistentes

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
