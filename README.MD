# Задание 2.10 по курсу "Азбука цифры. Веб-разработчик Р-ВР-3"
Данный репозиторий включает в себя пример одностраничного сайта с использованием фреймворка Materialize.

В сравнении с предыдущей версией, на сайт был добавлен раздел "Гостевая книга", в котором можно оставлять сообщения. Сообщения пользователей содержатся в виде JSON-массива в [users_db.json](users_db.json). Сообщение состоит из адреса электронной почты, самого сообщения и опциально аватара, который хранится в виде изображения, кодированного Base64. При отсутствии аватара, используется [один из типовых аватаров](images/avatars). Общение с базой данных сообщений производится с использованием REST API, для функционирования требуется запущенный json-server. Метод PUT в данный момент остаётся нереализованным, так как противоречит самой сути гостевой книги (уже отправленные сообщения не должны быть редактируемыми), а также реализация редактируемости может сломать макет списка.

Первоначальный драфт дизайна сайта:
[](figma/Desktop%20-%201.svg?sanitize=true)
<img src="figma/Desktop%20-%201.svg?sanitize=true">