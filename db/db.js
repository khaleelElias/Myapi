const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db.db')


/*--------------------LOGIN-----------------------------*/
db.run(`
    CREATE TABLE IF NOT EXISTS admin    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(20) NOT NULL,
        status ENUM [bad, normal, good] NOT NULL
    )
`)
exports.createAdmin = function(username, status, callback) {
    const query = "INSERT INTO admin (username, status) VALUES(?, ?)"
    const values = [username, status]

    db.run(query, values, function(error) {
        console.log(error)
        callback(error)
    })
}
exports.getAllAdmins = function(callback) {
    const query = "SELECT * FROM admin"

    db.all(query, function(error, admins) {
        callback(error, admins)
    })
}
exports.getAdminByUsername = function(username, callback) {
    const query = "SELECT FROM admin WHERE username = ?"

    db.get(query, [username], function(error, admin) {
        callback(error, admin)
    })
}
exports.getAdminById = function(id, callback) {
    const query = "SELECT * FROM admin WHERE id = ?"

    db.get(query, [id], function(error, admin) {
        callback(error, admin)
    })
}
exports.deleteUserById = function(id, callback) {
    const query = "DELETE FROM admin WHERE id = ?"

    db.run(query, [id], function(error) {
        callback(error)
    })
}
exports.updateStatus = function(id, status, callback)   {
    const query = "UPDATE admin SET status = ? WHERE id = ?"
    const values = [status, id]

    db.run(query, values, function(error)   {
        console.log(error)
        callback(error)
    })
}
/*-------------------- Column -------------------------*/
db.run(`
    CREATE TABLE IF NOT EXISTS column   (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255) NOT NULL,
        message VARCHAR(1000) NOT NULL,
        supervisor INTEGER,
        type INTEGER NOT NULL,
        FOREIGN KEY (supervisor) REFERENCES admin(id)
    )
`)

/* GetAllColumns */
exports.getAllColumns = function(callback) {
    const query = "SELECT * FROM column ORDER BY id DESC"

    db.all(query, function(error, columns) {
        callback(error, columns)
    })
}

/* CreateColumn */
exports.createColumn = function(title, message, supervisor, type, callback) {
    const query = "INSERT INTO column (title, message, supervisor, type) VALUES(?, ?, ?, ?)"
    const values = [title, message, supervisor, type]

    db.run(query, values, function(error) {
        callback(error)
    })
}
/* deleteColumn */
exports.deleteColumn = function(id, callback) {
    const query = "DELETE FROM column WHERE id = ?"
    const values = [id]

    db.run(query, values, function(error) {
        callback(error)
    })
}
/*getColumnById*/
exports.getColumnById = function(id, callback) {
    const query = "SELECT * FROM column WHERE id = ?"

    db.get(query, [id], function(error, column) {
        callback(error, column)
    })
}
/*updateColumn*/
exports.updateColumn = function(id, title, message, supervisor, type, callback) {
    const query = "UPDATE column SET title = ?, message = ?, supervisor = ?, type = ? WHERE id = ?"
    const VALUES = [title, message, supervisor, type, id]

    db.run(query, VALUES, function(error) {
        callback(error)
    })
}

exports.updateColumnSupervisor = function(columnId, userId, callback) {
    const query = "UPDATE column SET supervisor = ? WHERE id = ?"
    const VALUES = [userId, columnId]

    db.run(query, VALUES, function(error) {
        callback(error || null)
    })
}

/*---------------------- Order ---------------------------*/
db.run(`
	CREATE TABLE IF NOT EXISTS 'order'    (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
        orderNumber INTEGER NOT NULL,
		title TEXT NOT NULL,
        company TEXT NOT NULL,
        date DATE NOT NULL,
        status ENUM [bad, normal, good] NOT NULL,
        columnId INTEGER,
        priority INTEGER,
        FOREIGN KEY (columnId) REFERENCES column(id)
    )
`)

exports.getAllOrders = function(callback) {
    const query = "SELECT * FROM 'order' ORDER BY id DESC"

    db.all(query, function(error, orders) {
        callback(error, orders);
    })
}

exports.getAllOrdersFilteredByPriorty = function(callback) {
    const query = "SELECT * FROM 'order' ORDER BY priority DESC"

    db.all(query, function(error, orders) {
        callback(error, orders)
    })
}

exports.createOrder = function(orderNumber, title, company, date, status, priority, columnId, callback) {
    const query = "INSERT INTO 'order' (orderNumber, title, company, date, status, priority, columnId) VALUES (?, ?, ?, ?, ?, ?, ?)"
    const values = [orderNumber, title, company, date, status, priority, columnId]

    db.run(query, values, function(error) {
        callback(error);
    })
}
exports.getOrderById = function(id, callback) {
    const query = "SELECT * FROM 'order' WHERE id = ?"

    db.get(query, [id], function(error, order) {
        callback(error, order)
    })
}
exports.getOrderByColumnId = function(columnId, callback)   {
    const query = `SELECT * FROM 'order' WHERE columnId = ?`
    const values = [columnId]

    db.all(query, values, function(error, orders)   {
        callback(error, orders)
    })
}
exports.updateOrder = function(id, orderNumber, title, company, date, status, priority, columnId, callback) {
    const query = `UPDATE 'order' SET orderNumber = ?, title = ?, company = ?, date = ?, status = ?, priority = ?, columnId = ? WHERE id = ?`
    const values = [orderNumber, title, company, date, status, priority, columnId, id]

    db.run(query, values, function(error) {
        callback(error)
    })
}
exports.updateOrderStatus = function(id, status, callback)   {
    const query = "UPDATE 'order' SET status = ? WHERE id = ?"
    const values = [status, id]

    db.run(query, values, function(error)   {
        callback(error)
    })
}
exports.updateOrderPriority = function(id, priority, callback)   {
    const query = "UPDATE 'order' SET priority = ? WHERE id = ?"
    const values = [priority, id]

    db.run(query, values, function(error)   {
        callback(error)
    })
}
exports.deleteOrder = function(id, callback) {
    const query = `DELETE FROM 'order' WHERE id = ?`

    db.run(query, [id], function(error) {
        callback(error);
    })
}

/*--------------------- Check ---------------------------*/
db.run(`
    CREATE TABLE IF NOT EXISTS 'check'    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(200) NOT NULL,
        status ENUM [bad, normal, good] NOT NULL,
        columnId INTEGER NOT NULL,
        FOREIGN KEY (columnId) REFERENCES column(id)
    )
`)

exports.createCheck = function(title, status, columnId, callback) {
    const query = "INSERT INTO 'check' (title, status, columnId) VALUES (?, ?, ?)"
    const values = [title, status, columnId]

    db.run(query, values, function(error) {
        callback(error);
    })
}
exports.getAllChecks = function(callback) {
    const query = "SELECT * FROM 'check' ORDER BY id DESC"

    db.all(query, function(error, checks) {
        callback(error, checks);
    })
}
exports.getCheckById = function(id, callback) {
    const query = "SELECT * FROM 'check' WHERE id = ?"

    db.get(query, [id], function(error, post) {
        callback(error, post)
    })
}
exports.getChecksByColumnId = function(columnId, callback) {
    const query = "SELECT * FROM 'check' WHERE columnId = ?"

    db.all(query, [columnId], function(error, post) {
        callback(error, post)
    })
}
exports.updateCheckById = function(id, title, status, columnId, callback) {
    const query = `UPDATE 'check' SET title = ?, status = ?, columnId = ? WHERE id = ?`
    const values = [title, status, columnId, id]

    db.run(query, values, function(error) {
        callback(error);
    })
}
exports.deleteCheck = function(id, callback) {
    const query = `DELETE FROM 'check' WHERE id = ?`

    db.run(query, [id], function(error) {
        callback(error);
    })
}
exports.deleteChecksByColumnId = function(columnId, callback) {
    const query = `DELETE FROM 'check' WHERE columnId = ?`

    db.run(query, [columnId], function(error) {
        callback(error);
    })
}