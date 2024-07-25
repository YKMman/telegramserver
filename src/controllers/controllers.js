const pool = require('../db/db')
const queries = require('../models/models')


// ! Проверяем регистрацию
const checkedRegistration = async (telegram_id) => {
    try {
      const res = await pool.query(queries.getUser, [telegram_id]);
      // * если зарегистрирован, возвращаем true
      if (res.rowCount > 0) {
        return res.rows;
      } else {
        return []
      }
    } catch (error) {
      console.error(error);
    }
}

// ! регистрация пользователя без параметров. Просто регистрация
const registrationUserWithousStartParam = async (telegram_username, telegram_id) => {
    try {
        await pool.query(queries.registrationUser, [telegram_username, telegram_id]);
    } 
    catch (error) {
        console.error(error)
    }
}


// ! регистрация пользователя с параметрами. 
const registrationUserWithStartParam = async (telegram_username, telegram_id, start_param) => {

    // * зарегистрировать пользователя. 
    try {
        await pool.query(queries.registrationUser, [telegram_username, telegram_id]);
    }
    catch (error) {
        console.error(error)
    }

    // * заполнить таблицу с реф. с проверкой на то, что данного юзера уже приглашал такой же человек
    try {
        const check = await pool.query(queries.checkRef, [start_param, telegram_id])
        if (check.rowCount > 0) {
            return 
        } else {
            await pool.query(queries.refsAdd, [start_param, telegram_id])
        }
    }
    catch (error) {
        console.error(error)
    }
}




// ! главная функция регистрации
const registration = async (req, res) => {
    const {init_data_rows, user_rows} = req.body

    const telegram_id = user_rows.find((el) => el.title == 'id').value
    const telegram_username = user_rows.find((el) => el.title == 'username').value
    const start_param = init_data_rows.find((el) => el.title == 'start_param').value

    console.log(user_rows)
    // ! если пользователь зарегистрирован, то true
    const isRegistered = await checkedRegistration(telegram_id);

    if (isRegistered.length > 0) {
        res.status(200).send(isRegistered[0])
        return 
    }

    // // ! 'есть параметры и не зарегистрированы'
    if (start_param && isRegistered.length == 0) {
        registrationUserWithStartParam(telegram_username, telegram_id, start_param)
        res.status(400).send(isRegistered)
        return
    }

    // // ! 'нет параметры и не зарегистрированы'
    if (!start_param && isRegistered.length == 0) {
        registrationUserWithousStartParam(telegram_username, telegram_id)
        res.status(400).send(isRegistered)
        return
    }
}


module.exports = {
    registration,
}