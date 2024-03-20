```mermaid
sequenceDiagram
    participant browser
    participant server

        browser->>server: Sends the new_note as POST request

    
        browser->>server: Requests notes.html as GET at https://studies.cs.helsinki.fi/exampleapp/notes
        activate server
        server->>browser: Sends the notes.html file
        deactivate server
        
        Notes right of browser: renders the html document. Detects a stylesheet
        
        browser->>server: Requests main.css as GET at https://studies.cs.helsinki.fi/exampleapp/main.css
        activate server
        server->>browser: Sends the main.css file
        deactivate server
        
        Note right of browser: Applies the stylesheet. Detects a javascript file to execute.
        
        browser->>server: Requests main.js as GET at https://studies.cs.helsinki.fi/exampleapp/main.js
        activate server
        server->>browser: Sends the main.js file
        deactivate server
        
        Note right of browser: Executes the main.js file and detects a json file to be fetched.
        
        browser->>server: Requests data.json as GET at https://studies.cs.helsinki.fi/exampleapp/data.json
        activate server
        server->>browser: Sends the data.json file
        deactivate server
        
        Note right of browser: main.js fetches the json file and renders the data on page with callback function.
        
```
