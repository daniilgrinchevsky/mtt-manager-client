interface Enum {

}

class PAGE implements Enum {

    static readonly CREATE = new PAGE('','Создать')
    static readonly CREATE_REQUEST = new PAGE('/create/request','Заявку')
    static readonly CREATE_TOURIST = new PAGE('/create/tourist','Туриста')
    static readonly CREATE_TASK = new PAGE('/create/task','Задачу')

    static readonly REQUEST = new PAGE('','Заявки')
    static readonly REQUEST_LIST = new PAGE('/request/list','Список заявок')
    static readonly REQUEST_CALENDAR = new PAGE('/request/calendar','Календарь')
    static readonly REQUEST_TASKS = new PAGE('/request/tasks','Задачи')
    static readonly REQUEST_DEPARTURE_SCHEDULE = new PAGE('/request/departure-schedule','График выездов')
    static readonly REQUEST_VISA_SCHEDULE = new PAGE('/request/visa-schedule','График виз')
    static readonly REQUEST_INSURANCE_SCHEDULE = new PAGE('/request/insurance-schedule','График страховок')

    static readonly TOURIST = new PAGE('','Туристы')
    static readonly TOURIST_CLIENTS = new PAGE('/tourist/clients','Заказчики / Туристы')
    static readonly TOURIST_IMPORT = new PAGE('/tourist/import','Импорт туристов')

    static readonly PARTNER = new PAGE('','Партнеры')
    static readonly PARTNER_LIST = new PAGE('/partner/list','Список партнеров')
    static readonly PARTNER_TYPES = new PAGE('/partner/types','Типы партнеров')
    static readonly PARTNER_CONTACT_DEPARTMENTS = new PAGE('/partner/contact-departments','Отделы контактных лиц')

    static readonly INTEGRATION = new PAGE('','Интеграции')
    static readonly INTEGRATION_MAIL_BOXES = new PAGE('/integration/mail-boxes','Почтовые ящики')
    static readonly INTEGRATION_SOCIAL_MEDIA = new PAGE('/integration/social-media','Мессенджеры и соцсети')
    static readonly INTEGRATION_ONLINE_CHAT = new PAGE('/integration/online-chat','Онлайн-чат')
    static readonly INTEGRATION_ONLINE_PAYMENTS = new PAGE('/integration/online-payments','Онлайн-кассы и оплата')
    static readonly INTEGRATION_ONLINE_DOCUMENT_SIGN = new PAGE('/integration/online-document-sign','Онлайн-подпись документов')
    static readonly INTEGRATION_SMS_EMAIL = new PAGE('/integration/sms-email','СМС / Email')
    static readonly INTEGRATION_IP_TELEPHONY = new PAGE('/integration/ip-telephony','IP-телефония')

    static readonly SETTING = new PAGE('','Настройки')
    static readonly SETTING_MY_COMPANY = new PAGE('/setting/my-company','Моя компания')
    static readonly SETTING_STAFF = new PAGE('/setting/staff','Сотрудники')
    static readonly SETTING_PERMISSIONS = new PAGE('/setting/permissions','Права доступа')
    static readonly SETTING_DOCUMENT_TEMPLATES = new PAGE('/setting/document-templates','Шаблоны документов')
    static readonly SETTING_SYSTEM = new PAGE('/setting/system','Система')
    static readonly SETTING_CURRENCIES = new PAGE('/setting/currencies','Валюты')

    private constructor(public readonly path: string, public readonly title: string) {}
}

export {
    PAGE
}
