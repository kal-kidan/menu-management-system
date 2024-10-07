# @kal/menu-management

This is a menu-management-system project named `@kal/menu-management`, designed for running multiple apps (server and web) using `pnpm` in a monorepo structure. The project utilizes parallel running of development and start commands for a streamlined workflow.
The project starts by seeding a set of defined menus and sub menus to get you started quickly. 
Here is the link to do menus crud 
 localhost:3000/system/menu
## Table of Contents
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To set up and run this project, follow these steps:

1. **Install pnpm**: If you don’t have `pnpm` installed globally, you can install it by running:
    ```bash
    npm install -g pnpm
    ```
    Alternatively, the script `ensure` will install pnpm automatically if it's not already installed.

2. **Install Dependencies**: 
    ```bash
    pnpm install
    ```

3. **Install Dependencies**: 
    To install all dependencies across all workspaces (server and web):
    ```bash
    pnpm run install-all
    ```


4. **Running in Development Mode**: 
    To start both the server and web apps in parallel:
    ```bash
    pnpm run dev
    ```

5. **Building the Project**:
    To build the server and web apps:
    ```bash
    pnpm run build
    ```

6. **Starting the Project**: 
    To start both the server and web apps in parallel:
    ```bash
    pnpm run start
    ```

## Scripts

Here is a list of the available scripts and what they do:

- `dev`: Runs the development servers in parallel for both the `server` and `web` apps.
- `build`: Builds the `server` and `web` apps individually using `pnpm run --filter`.
- `start`: Starts the production build of both `server` and `web` apps in parallel.
- `ensure`: Installs `pnpm` if it is not already installed and runs `pnpm install`.

 

