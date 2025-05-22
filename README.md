# ~*~ Chat98 - AIM Style Chat App ~*~

OMGZ!! Welcome to Chat98, ur new fave AIM-style chat app! It's like, totally retro and kewl. Get ready to chat like it's 1999! LOL!

## !! GETTIN STARTED !!

So u wanna get this bad boy runnin? It's easy peasy!

1.  **Clone da Repo**: If u haven't already, get the code!
    ```bash
    git clone <repository_url>
    cd test # or wherever u cloned it!
    ```

2.  **Install Dependencies**: U need all the stuffs to make it work!
    ```bash
    npm install
    # or if ur a yarn person
    # yarn install
    # or if ur a pnpm playa
    # pnpm install
    ```

3.  **Set Up Ur Environment VArIaBlEs**: This is SUPER important for the AI bot to talk!
    *   Create a new file in the main `test` directory called `.env`
    *   Copy the stuff from `.env.example` into ur new `.env` file. It looks like this:
        ```env
        NEXT_PUBLIC_OPENROUTER_API_KEY=YOUR_OPENROUTER_API_KEY_HERE
        NEXT_PUBLIC_OPENROUTER_MODEL=mistralai/devstral-small:free
        ```

4.  **Get an OpenRouter API Key**:
    *   Go to [OpenRouter.ai](https://openrouter.ai/) and sign up (or log in if u already got an account, u pro!).
    *   Find ur API key. It's usually in ur account settings or dashboard.
    *   Copy that key and paste it into ur `.env` file where it says `YOUR_OPENROUTER_API_KEY_HERE`. Make sure there are no spaces around it!

5.  **Choose a Model (Optional but Kewl!)**:
    *   The app is set to use `mistralai/devstral-small:free` by default, cuz it's pretty good and free!
    *   If u wanna try a different model from OpenRouter:
        *   Find the model ID on OpenRouter (e.g., `google/gemma-2b-it:free`, `anthropic/claude-3-haiku`).
        *   Update the `NEXT_PUBLIC_OPENROUTER_MODEL` in ur `.env` file with the new model ID.
        *   **Important Note**: Some models might not be free, so keep an eye on ur OpenRouter account usage if u pick a paid one! Also, different models might act a lil different with the AIM personality.

6.  **Run da App!**:
    ```bash
    npm run dev
    # or
    # yarn dev
    # or
    # pnpm dev
    ```
    Then open ur browser and go to `http://localhost:3000` (or whatever port it tells u).

## ~*~ CHATTIN' TIME ~*~

Now u can chat with Chat98! Type ur messages and see what kinda wacky AIM-style responses u get! Have fun and don't 4get 2 BRB if u g2g! ;P

---
Peace out! 🤘
