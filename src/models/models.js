const getUser = "SELECT * FROM users WHERE telegram_id = $1";
const registrationUser = "INSERT INTO users (telegram_name, telegram_id) VALUES ($1, $2)";
const checkRef = "SELECT * FROM refs WHERE telegram_id_inviter = $1 AND telegram_id_invited = $2";
const returnRefs = "SELECT * FROM refs WHERE telegram_id_inviter = $1";
const returnPublics = "SELECT * FROM quests";
const refsAdd = "INSERT INTO refs (telegram_id_inviter, telegram_id_invited, telegram_name) VALUES ($1, $2, $3)";


module.exports = {
    getUser,
    registrationUser,
    checkRef,
    refsAdd,
    returnRefs,
    returnPublics
}