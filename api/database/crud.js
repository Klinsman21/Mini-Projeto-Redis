const pool = require('./pool');

// banco de dados
const NewUser = (request, response) => {
  const user = {
    name: request.params.name,
    email: request.params.email,
    password: request.params.password,
  }
  
  var sql = `INSERT INTO CRUD (nome, email, senha) VALUES ('${user.name}', '${user.email}', '${user.password}');`
  pool.query(sql, (error, results) => {
    if (error) {
      response.status(200).json(error);
      throw error;
    }
    else{
      response.status(200).json({'status': true});
    }
  });
};

const UpdateUser = (request, response) => {
  const userUpdated = {
    name: request.params.name,
    email: request.params.email,
    password: request.params.password,
    usrID: request.params.usrID,
  }
  pool.query(`UPDATE CRUD SET nome = '${userUpdated.name}', senha = '${userUpdated.password}', email = '${userUpdated.email}'  WHERE CRUD.email = '${userUpdated.usrID}';`, (error, results) => {
    if (error) {
      response.status(200).json(error);
    }
    else{
      response.status(200).json({'status': true});
    }
    
  });
};

const DeleteUser = (request, response) => {
  pool.query(`DELETE FROM CRUD WHERE CRUD.email = '${request.params.usrID}';`, (error, results) => {
    if (error) {
      response.status(200).json(error);
    }
    else{
      response.status(200).json({'status': true});
    }
    
  });
};

const SearchUser = (request, response) => {
  pool.query(`SELECT nome, senha, email FROM CRUD WHERE CRUD.email = '${request.params.usrID}';`, (error, results) => {
    if (error) {
      response.status(200).json(error);
      throw error;
    }
    else{
      response.status(200).json(results.rows);
    }
  });
};


module.exports = { NewUser, UpdateUser, DeleteUser, SearchUser};