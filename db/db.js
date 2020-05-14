const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db.db')


/*--------------------LOGIN-----------------------------*/
db.run(`
    CREATE TABLE IF NOT EXISTS admin(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(20) NOT NULL UNIQUE,
        password VARCHAR(20) NOT NULL
    )
`)

exports.createAdmin = function(username, password, callback) {
    const query = "INSERT INTO admin (username, password) VALUES(? , ?)"
    const values = [username, password]

    db.run(query, values, function(error) {
        callback(error)
    })
}

exports.getAdmin = function(username, callback) {
    const query = "SELECT * FROM admin WHERE username = ?"

    db.get(query, [username], function(error, admin) {
        callback(error, admin)
    })
}

/*--------------------guestbook-------------------------*/

db.run(`
    CREATE TABLE IF NOT EXISTS guestbook(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(20) NOT NULL,
        message VARCHAR(100) NOT NULL
    )
`)

/* GetAllGuestBook */
exports.getAllGuestBookPosts = function(callback) {
        const query = "SELECT * FROM guestbook ORDER BY id DESC"

        db.all(query, function(error, posts) {
            callback(error, posts)
        })
    }
    /* CreateGuestbook */
exports.createGuestBookPost = function(title, message, callback) {
        const query = "INSERT INTO guestbook (title,message) VALUES(?,?)"
        const values = [title, message]

        db.run(query, values, function(error) {
            callback(error)
        })
    }
    /* deleteGuestBookPost */
exports.deleteGuestBookPost = function(id, callback) {
        const query = "DELETE FROM guestbook WHERE id = ?"
        const values = [id]

        db.run(query, values, function(error) {
            callback(error)
        })
    }
    /*getGuestBookById*/
exports.getGuestBookById = function(id, callback) {
        const query = "SELECT * FROM guestbook WHERE id = ?"

        db.get(query, [id], function(error, posts) {
            callback(error, posts)
        })
    }
    /*updateGuestbookPost*/
exports.updateGuestbookPost = function(id, title, message, callback) {
    const query = "UPDATE guestbook SET title = ?, message = ? WHERE id = ?"
    const VALUES = [title, message, id]
    db.run(query, VALUES, function(error) {
        callback(error)
    })
}



/*----------------------Blog---------------------------*/

db.run(`
	CREATE TABLE IF NOT EXISTS BlogPost (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL,
        abstract TEXT NOT NULL
    )
`)

exports.getAllBlogPost = function(callback) {
    const query = "SELECT * FROM blogpost order by id desc"
    db.all(query, function(error, posts) {
        callback(error, posts);
    })
}
exports.createBlogPost = function(title, text, callback) {
    const query = "INSERT INTO BLOGPOST (title, abstract) VALUES (?, ?)"
    const values = [title, text]

    db.run(query, values, function(error) {
        callback(error);
    })
}
exports.getBlogPostById = function(id, callback) {
    const query = "SELECT * FROM BLOGPOST where ID = ?"

    db.get(query, [id], function(error, post) {
        callback(error, post)
    })
}
exports.updateBlogPostById = function(id, title, text, callback) {
    const query = `UPDATE BLOGPOST SET title = ?, abstract = ? where id = ?`
    const values = [title, text, id]
    db.run(query, values, function(error) {
        callback(error);
    })
}
exports.deleteBlogPostById = function(id, callback) {
    const query = `DELETE FROM BLOGPOST where ID = ?`
    const values = [id]
    db.run(query, values, function(error) {
        callback(error);

    })
}
exports.latestBlogpost = function(callback) {
    const query = "SELECT id FROM BLOGPOST WHERE id=( SELECT max(id) FROM BLOGPOST)"

    db.get(query, function(error, post) {
        callback(error, post)
    })
}


/*---------------------Portfoilo---------------------------*/

db.run(`
    CREATE TABLE IF NOT EXISTS portfolio(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(200) NOT NULL,
        message VARCHAR(1000) NOT NULL
    )
`)

exports.getAllportfolio = function(callback) {
    const query = "SELECT * FROM portfolio order by id desc"
    db.all(query, function(error, posts) {
        callback(error, posts);
    })
}
exports.createportfolio = function(title, text, callback) {
    const query = "INSERT INTO portfolio (title, message) VALUES (?, ?)"
    const values = [title, text]

    db.run(query, values, function(error) {
        callback(error);
    })
}
exports.getportfolioById = function(id, callback) {
    const query = "SELECT * FROM portfolio where ID = ?"

    db.get(query, [id], function(error, post) {
        callback(error, post)
    })
}
exports.updateportfolioById = function(id, title, text, callback) {
    const query = `UPDATE portfolio SET title = ?, message = ? where id = ?`
    const values = [title, text, id]
    db.run(query, values, function(error) {
        callback(error);
    })
}
exports.deleteportfolioById = function(id, callback) {
    const query = `DELETE FROM portfolio where ID = ?`
    values = [id]
    db.run(query, values, function(error) {
        callback(error);

    })
}
exports.latestportfolio = function(callback) {
    const query = "SELECT id FROM portfolio WHERE id=( SELECT max(id) FROM portfolio)"

    db.get(query, function(error, post) {
        callback(error, post)
    })
}