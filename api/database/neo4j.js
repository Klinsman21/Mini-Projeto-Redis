const neo4j = require('neo4j-driver')

const uri = `neo4j://${process.env.NEO4J_HOST}:${process.env.NEO4J_PORT}`
const driver = neo4j.driver(uri, neo4j.auth.basic(
    process.env.NEO4J_USER, process.env.NEO4J_PASSWORD
))

const session = driver.session()

async function Create(obj) {

    try {
        const query = `CREATE(u:User{nome:"${obj.name}", email:"${obj.email}"}) RETURN u`
        await session.run(query).then(result => console.log(result.records[0].length > 0))
    }
    finally {
        //session.close()
    }
}

async function Follow(myEmail, followerEmail) {
    let dateTime = new Date();
    let followDateTime = `Começou a seguir em ${dateTime.getDate()}/${dateTime.getMonth()+1}/${dateTime.getFullYear()} as ${dateTime.getHours()}hrs`

    try {
        const query = `MATCH(u1:User), (u2:User)
                        WHERE u1.email="${myEmail}" AND u2.email="${followerEmail}"
                        CREATE(u1)-[:SEGUE{desde:"${followDateTime}"}]->(u2)`
        await session.run(query).then(result => console.log(result.summary.counters._stats.relationshipsCreated))
    }
    finally {
        //await session.close()
    }
}

async function Remove(email) {
    try {
        const query = `MATCH(u:User{email:"${email}"}) DETACH DELETE u`
        await session.run(query).then(result => console.log(result.summary.counters._stats.nodesDeleted))
    }
    finally {
        //await session.close()
    }
}


module.exports = {Create, Follow, Remove};