const pool = require('../db/db')
const queries = require('../models/models')


// ! Проверяем регистрацию
const registrationChecked = async (telegram_id) => {
    const res = await pool.query(queries.getUser, [telegram_id]);
    // * если зарегистрирован, возвращаем true
    if (res.rowCount > 0) {
        return res.rows;
    } else {
        return []
    }
}

// * api/registration
const registration = async (req, res) => {
    const {init_data_rows, user_rows} = req.body

    const telegram_id = user_rows.find((el) => el.title == 'id').value
    const telegram_username = user_rows.find((el) => el.title == 'username').value
    const start_param = init_data_rows.find((el) => el.title == 'start_param').value

    console.log(telegram_id, telegram_username, start_param)
    console.log(pool.connect)

    try {
        const isRegistered = await registrationChecked(telegram_id);

        if (isRegistered.length > 0) {
            res.status(200).send(isRegistered[0])
            return 
        }

        if (isRegistered.length == 0) {
            // * зарегистрировать пользователя. 
            await pool.query(queries.registrationUser, [telegram_username, telegram_id]);
        }

        
        if (start_param) {
            if (start_param == 'debug') {
                return
            }
            // * заполнить таблицу с реф. с проверкой на то, что данного юзера уже приглашал такой же человек

            const check = await pool.query(queries.checkRef, [start_param, telegram_id])
            if (check.rowCount > 0) {
                return 
            } else {
                // new telegram name = select * from users where telegram_id_inviter = start param
                const tgStartParamName = await pool.query(queries.getUser, [start_param]);
                const tgName = tgStartParamName.rows[0].telegram_name
                await pool.query(queries.refsAdd, [start_param, telegram_id, tgName])
            }
        }

        res.status(400).send(isRegistered)
    } 
    catch (error) {
        console.error(error)
    }
}

// * api/quests
const quests = async (req, res) => {
    const { telegram_id } = req.body

    try {
        const queryCount = await pool.query(queries.returnRefs, [telegram_id])
        const queryTg = await pool.query(queries.returnPublics)
        const data = {
            count: queryCount.rows,
            completed: process.env.CLIENT_FRIENDS_QUEST_COUNT_LIMIT,
            public_link: queryTg.rows
        }
        res.status(200).send(data)
    } 
    catch (error) {
        console.error(error)
    }
    // вернуть реферальную ссылку. вернуть количество реферальных друзей. вернуть количество людей, необходимых для того, чтобы получить награду.
}



module.exports = {
    registration,
    quests
}





