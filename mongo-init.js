
db.createUser({
    user: process.env.MONGO_INITDB_ROOT_USERNAME || "payload",
    pwd: process.env.MONGO_INITDB_ROOT_PASSWORD || "Khoa0109",
    roles: [
      {
        role: "readWrite",
        db: process.env.MONGO_DB_NAME || "company-blog",
      },
    ],
  });
  