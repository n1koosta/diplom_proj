define(function() {
    const db = openDatabase("Goods", "0.1", "List of workers", 20000);
    if(!db){ alert("Failed to connect to database."); }

    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE Goods (id REAL UNIQUE, name TEXT UNIQUE, salary INT, experience INT, koef INT, percentage INT, totalSalary INT)", [], null, function(tx, error) {
            console.log(error);
       });
    });

    return {
        save: function(data) {
            return new Promise((resolve, reject) => {
            db.transaction(function(tx) {
                tx.executeSql("INSERT INTO Goods (name, salary, experience, koef, percentage, totalSalary) values(?, ?, ?, ?, ?, ?)",
                    [data.name, data.salary, data.experience, data.koef, data.percentage, data.totalSalary],
                    () => {
                        resolve(data);
                    },
                    (tx, error) => {
                    console.log(error);
                });
            });
        });
        },

        getAll: function() {
            let results;
            return new Promise((resolve, reject) => {
                db.transaction(function(tx) {
                    tx.executeSql("SELECT * FROM Goods",
                    [],
                    function(tx, result) {
                        resolve (result.rows)
                    },
                    function(tx, error) {
                         console.log(error);
                         reject(error);
                    }
                )});
            })
        },

        clearTable: function() {
            db.transaction(function(tx) {
                tx.executeSql("DROP TABLE Goods",
                [],
                function(tx,results){console.log("Successfully Dropped")},
                function(tx,error){console.log("Could not delete")}
            )});
        }
    }
  });