Mongodb - db

-database used to store and manage data permenently

sql                                                         MongoDB
-relational / sql dbms                                      -document oriented /nosql db
-store data in table with rows and colums                   -store data as collection and documents           
-fixed schema -                                             -uses dynamic schema
-optimaized for complex joins & transactoins                -optimized for scalability and 
                                                            performance
-suppoet richset of data types                              -limited set of data types 
-declarative query language                                 -expressive query language based on 
                                                            json
-ACID property - (Atomicity,Consistancy,Isolation,          -NoSql based on CAP (consistancy,availability, partitions 
                  Durability)                                tolerance )
-uses traditional business applications                     -used in bigdata and real time applications


collection must start with small letters and it must a plural word
-MongoDB will create a unique id for all new document, which is a hexdecimal object id is stored in  _id


-CRUD operation

    -read all documents stored in a collection :find()
    -db.users.find()
    -read a document stored in a collection whose satisfy a condition : findOne(key:value),
    if condition satisfy then it return the entire document , else return null
    (findone -  check if exist a value)
    - inserta data in MongoDB collection: inserOne
    - insert multiple data in MongoDB collection: insertMany([{key:value}....])
    -display toatl document count in a collection : countDocuments()
    -display too llimit count of document read from collection:limit (number)
    -to sort  data : sort(condition)
    -$gt/$gte/$lt/$lte-used to perform querying while reading the document
    -$in/$nin -used to check documents are included or not 
    -$expr -usedto compare  2 fiels in a document 
    -to update document uses updateone/updateMany()
        -$set to assign values
        -$inc to increament valuee
    -$push to insert data to an array in a document
    -to delete documet from a collection use deleteOne/deleteMany()
    -aggregation:used to join multiple collection to get common result
    -$lookup:similar as left outer-join in sql

    -join
    -syntax:{
        $lookup:{
            from:<collection to join,
            localfield:<field from input document>,
            foreignfield:<field from the document of 'from' collection>,
            as:<output field>
        }
    }


    Node js --server/backend
    ------------------------
    -run time environment for js + js libraries
    -features
        -extreamly fast
        -asynchronous
        -single threaded and event loop
        -highly scalable(can handle large amount of data)
        -open source
    -Nodejs global objects
        -it can access anywhere from node js application without exporting/importing 
            ex:console.log(), setTimeOut()
    
    -Node js Module system : a file is considered as moudule in node.js to access data from  one file it has export 
    from there, and before using it in another file it has to import

        -to import module: require('module_name/path')
        -to export module: module.exports
                           exports
    -Builtin functions
        -fs:file system , handling file related events
        -http: create http webserver
        -https: create https webserver 
        -crypto: providing tool like hashing,encryption,etc
        -events:handling eventEmitter
        -Process: used to provide currently running process in the node js
        -process: environmental variable used to hold configuration or confidential data regarding the project,to access
        ev throughoout the application use "process.env.variable_name"
         process.env.variable_name

    node js packages
        -used to resolve common problems
        -install packages via npm
        -it adds package.json - ,package.lock.json - to lock versions, node modules-hold copy of installed package

    backend concdepts
        client server architecture
        -REST API - http request and json data
        <!-- -SOAP API - http request and xml data -->
        CRUD operations: create (post), read (get) , update (put), delete
        -CORS (CROSS ORIGIN RESOURCE SHARING) - protocol must enabled in server  

    ------------
    NODE EXPRESS
    ------------                                    
    -framework of node js to create webserver in client-server architectures
    -steps to create server using express
        -


jsonWebToken
------------
-library used for authentication in client-server request
-used to securely tranasfer information over web
-generate token only if login success
    -token creation using jwt : use sign(payload,password)
    -paylaod: it is the data that we want to store inside the token 
    -password:can be any data that has to define in .env file


MiddleWare - Node js
--------------------
-used to controll request respose cycle in server.before resolving server can perform any task (autherization,data 
format changing etc..) using middleware (task eg:- authrization)
-middleware are function with 3 arguments, they are request , response and next
    -request  :  will give you client request
    -response :  object will you give you response from server to client
    -next     :  used to controll request(handle)

-middleware are 2 types
    -application specific : middleware will active for all client request 
    -router specific : middleware will active only selectes route/path

-set up authorization using middleware
    -create a folder in server 
    -create a js file inside the folder to define middleware
    -import jwt
    -token verification using jwt : verify(token,password), return a response if token verify else return an error 
    -export jwtMiddleware and aply in specific route

Multer
--------
-Multer is a node .js middleware for handling multipart/form-date , which is primarilly used for uplaoding files
    stepts for creating multer middleware
        -create js file to define middleware
        -install multer using the command npm i router
        -import multer in js file
        -create 'uplaod' folder in server folder for stroring uplaod files


-data sharing between components in react 
    -state lifting: lifting a state to its parent , such that it can share between its child, using props
    -redux : to avoid props drilling while sharing the data across different components, avoid props driling
    -context api : use context to share data between different components, avoid props drilling

-Context api - data sharing technique in react
-----------------------------------------------
-providing a centralized way to change state across components
-share a specific info:(like state or function) with multiple components , without props without 
-steps:
    -creating a context : creating a context using the createContext() method
    -providing the context : use provider of context. so that it helps to providee data to components
    -consuming context : to use/access data shared using context api use 'useContext()' hook