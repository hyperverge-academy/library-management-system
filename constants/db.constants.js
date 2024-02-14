const dbConfig = {
    dbName : "libraryManagement",
    memberCollection:"members",
    bookCollection: "books",
    issueReturnBooksCollection : "issuedBooks",
    uri: "mongodb://localhost:27017",
}
module.exports = dbConfig;
