const getUser = "SELECT * FROM users WHERE telegram_id = $1";
const registrationUser = "INSERT INTO users (telegram_name, telegram_id) VALUES ($1, $2)";
const checkRef = "SELECT * FROM refs WHERE telegram_id_inviter = $1 AND telegram_id_invited = $2";
const refsAdd = "INSERT INTO refs (telegram_id_inviter, telegram_id_invited) VALUES ($1, $2)";


module.exports = {
    getUser,
    registrationUser,
    checkRef,
    refsAdd,
}