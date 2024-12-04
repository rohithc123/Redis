This repo is just the basics I learned to get started with Redis

# Redis

- Type: In-memory data structure store, used as a database, cache, and message broker.
- Data Model: Key-value store.
- Performance: Extremely fast due to in-memory storage.
- Use Cases: Caching, real-time analytics, session management, pub/sub messaging.
- Persistence: Supports snapshotting and append-only file (AOF) persistence.
- Scalability: Supports clustering and replication.

# MongoDB

- Type: NoSQL document-oriented database.
- Data Model: Document store (JSON-like documents).
- Performance: Good for read-heavy and write-heavy workloads, but generally slower than Redis due to disk-based storage.
- Use Cases: Content management, real-time analytics, big data, mobile and social infrastructure.
- Persistence: Data is stored on disk.
- Scalability: Supports sharding and replication.

When we have to frequently fetch data where the modifications are rare we can use redis, but it is kind of volatile.
If changes made to it are not stored regularly we tend to loose those data.

# Installation

- For this use the WSL(if using windows) i.e windows subsystem for Linux
- Use command sudo apt-get install redis
- Use command redis-server to start the server (6379 is a default port)
- Use command redis-cli to connect to the server in another wsl terminal

# Basic commands

- Use SET key value to set key-value pairs
- GET key - to get the value for the key
- DEL key - to delete key
- EXISTS key
- KEYS \* - to get all keys
- flushall - to delete all keys
- ttl key - time to live(kind of like expiration time)
- expire key seconds - to set expiration time for the key (Ex: expire key 10)
- lpush key value -  command inserts the value at the head (left) of the list stored 
- rpush key value - command inserts the value at the end (right) of the list stored
- GET only works for string 
- lrange key start_index end_index -  Retrieves a subset of the list stored at the specified key using the LRANGE command. 
- LPOP key - remove the left element from the list 
- RPOP key - remove the right element from the list
