```mermaid
    sequence diagram
    
    participant browser
    participant server
    
        browser->>server: Request the html file
        activate server
        server->>browser: Sends the html file
        deactivate server
        
        browser->>server: Requests main.css file
        activate server
        server->>browser: Sends the main.css file
        deactivate server
        
        browser->>server: Requests main.js file
        activate server
        server->>browser: Sends the main.js file
        deactivate server
        
        
        browser->>server: Requests data.json file
        activate server
        server->>browser: Sends the data.json file
        deactivate server
        
        
```
