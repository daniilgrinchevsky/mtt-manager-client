const menuData: any = [
    // {
    //     label: 'menu',
    //     isTitle: true,
    // },
    // {
    //     id: "create",
    //     label: PAGE.CREATE.title,
    //     link: "/#",
    //     icon: <Plus />,
    //     subItems: [
    //         {
    //             id: 'create-request',
    //             label: PAGE.CREATE_REQUEST.title,
    //             link: PAGE.CREATE_REQUEST.path,
    //             parentId: 'create'
    //         },
    //         {
    //             id: 'create-tourist',
    //             label: PAGE.CREATE_TOURIST.title,
    //             link: PAGE.CREATE_TOURIST.path,
    //             parentId: "create"
    //         },
    //         {
    //             id: 'create-task',
    //             label: PAGE.CREATE_TASK.title,
    //             link: PAGE.CREATE_TASK.path,
    //             parentId: "create",
    //             isModal: true
    //         },
    //     ]
    // },
    // {
    //     id: "request",
    //     label: PAGE.REQUEST.title,
    //     link: "/#",
    //     icon: <FileText />,
    //     subItems: [
    //         {
    //             id: 'request-list',
    //             label: PAGE.REQUEST_LIST.title,
    //             link: PAGE.REQUEST_LIST.path,
    //             parentId: "request"
    //         },
    //         {
    //             id: 'calendar',
    //             label: PAGE.REQUEST_CALENDAR.title,
    //             link: PAGE.REQUEST_CALENDAR.path,
    //             parentId: "request"
    //         },
    //         {
    //             id: 'tasks',
    //             label: PAGE.REQUEST_TASKS.title,
    //             link: PAGE.REQUEST_TASKS.path,
    //             parentId: "request"
    //         },
    //         {
    //             id: 'departure-schedule',
    //             label: PAGE.REQUEST_DEPARTURE_SCHEDULE.title,
    //             link: PAGE.REQUEST_DEPARTURE_SCHEDULE.path,
    //             parentId: "request"
    //         },
    //         {
    //             id: 'visa-schedule',
    //             label: PAGE.REQUEST_VISA_SCHEDULE.title,
    //             link: PAGE.REQUEST_VISA_SCHEDULE.path,
    //             parentId: "request"
    //         },
    //         {
    //             id: 'insurance-schedule',
    //             label: PAGE.REQUEST_INSURANCE_SCHEDULE.title,
    //             link: PAGE.REQUEST_INSURANCE_SCHEDULE.path,
    //             parentId: "request"
    //         }
    //     ]
    // },
    // {
    //     id: 'tourist',
    //     label: PAGE.TOURIST.title,
    //     link: "/#",
    //     icon: <TentTree />,
    //     subItems: [
    //         {
    //             id: 'clients-tourists',
    //             label: PAGE.TOURIST_CLIENTS.title,
    //             link: PAGE.TOURIST_CLIENTS.path,
    //             parentId: 'tourist'
    //         },
    //         {
    //             id: 'tourists-import',
    //             label: PAGE.TOURIST_IMPORT.title,
    //             link: PAGE.TOURIST_IMPORT.path,
    //             parentId: 'tourist'
    //         }
    //     ]
    // },
    // {
    //     id: 'partner',
    //     label: PAGE.PARTNER.title,
    //     link: "/#",
    //     icon: <Users />,
    //     subItems: [
    //         {
    //             id: 'partner-list',
    //             label: PAGE.PARTNER_LIST.title,
    //             link: PAGE.PARTNER_LIST.path,
    //             parentId: 'partner'
    //         },
    //         {
    //             id: 'partner-types',
    //             label: PAGE.PARTNER_TYPES.title,
    //             link: PAGE.PARTNER_TYPES.path,
    //             parentId: 'partner'
    //         },
    //         {
    //             id: 'contact-departments',
    //             label: PAGE.PARTNER_CONTACT_DEPARTMENTS.title,
    //             link: PAGE.PARTNER_CONTACT_DEPARTMENTS.path,
    //             parentId: 'partner'
    //         }
    //     ]
    // },
    // {
    //     id: 'integration',
    //     label: PAGE.INTEGRATION.title,
    //     link: "/#",
    //     icon: <Blocks />,
    //     subItems: [
    //         {
    //             id: 'mail-boxes',
    //             label: PAGE.INTEGRATION_MAIL_BOXES.title,
    //             link: PAGE.INTEGRATION_MAIL_BOXES.path,
    //             parentId: 'integration'
    //         },
    //         {
    //             id: 'social-media',
    //             label: PAGE.INTEGRATION_SOCIAL_MEDIA.title,
    //             link: PAGE.INTEGRATION_SOCIAL_MEDIA.path,
    //             parentId: 'integration',
    //         },
    //         {
    //             id: 'online-chat',
    //             label: PAGE.INTEGRATION_ONLINE_CHAT.title,
    //             link: PAGE.INTEGRATION_ONLINE_CHAT.path,
    //             parentId: 'integration',
    //         },
    //         {
    //             id: 'online-payments',
    //             label: PAGE.INTEGRATION_ONLINE_PAYMENTS.title,
    //             link: PAGE.INTEGRATION_ONLINE_PAYMENTS.path,
    //             parentId: 'integration'
    //         },
    //         {
    //             id: 'online-document-sign',
    //             label: PAGE.INTEGRATION_ONLINE_DOCUMENT_SIGN.title,
    //             link: PAGE.INTEGRATION_ONLINE_DOCUMENT_SIGN.path,
    //             parentId: 'integration',
    //         },
    //         {
    //             id: 'sms-email',
    //             label: PAGE.INTEGRATION_SMS_EMAIL.title,
    //             link: PAGE.INTEGRATION_SMS_EMAIL.path,
    //             parentId: 'integration',
    //         },
    //         {
    //             id: 'ip-telephony',
    //             label: PAGE.INTEGRATION_IP_TELEPHONY.title,
    //             link: PAGE.INTEGRATION_IP_TELEPHONY.path,
    //             parentId: 'integration',
    //         },
    //
    //     ]
    // },
    // {
    //     id: 'setting',
    //     label: PAGE.SETTING.title,
    //     link: "/",
    //     icon: <Cog />,
    //     subItems: [
    //         {
    //             id: 'my-company',
    //             label: PAGE.SETTING_MY_COMPANY.title,
    //             link: PAGE.SETTING_MY_COMPANY.path,
    //             parentId: 'setting'
    //         },
    //         {
    //             id: 'staff',
    //             label: PAGE.SETTING_STAFF.title,
    //             link: PAGE.SETTING_STAFF.path,
    //             parentId: 'setting'
    //         },
    //         {
    //             id: 'permissions',
    //             label: PAGE.SETTING_PERMISSIONS.title,
    //             link: PAGE.SETTING_PERMISSIONS.path,
    //             parentId: 'setting'
    //         },
    //         {
    //             id: 'document-templates',
    //             label: PAGE.SETTING_DOCUMENT_TEMPLATES.title,
    //             link: PAGE.SETTING_DOCUMENT_TEMPLATES.path,
    //             parentId: 'setting'
    //         },
    //         {
    //             id: 'system',
    //             label: PAGE.SETTING_SYSTEM.title,
    //             link: PAGE.SETTING_SYSTEM.path,
    //             parentId: 'setting'
    //         },
    //         {
    //             id: 'currencies',
    //             label: PAGE.SETTING_CURRENCIES.title,
    //             link: PAGE.SETTING_CURRENCIES.path,
    //             parentId: 'setting'
    //         },
    //
    //     ]
    // },
    // {
    //     id: 'other',
    //     label: PAGE.OTHER.title,
    //     link: "/",
    //     icon: <MoreVertical />,
    //     subItems: [
    //         {
    //             id: 'handbook',
    //             label: PAGE.OTHER_HANDBOOK.title,
    //             link: PAGE.OTHER_HANDBOOK.path,
    //             parentId: 'other'
    //         },
    //         {
    //             id: 'bonus',
    //             label: PAGE.OTHER_BONUS.title,
    //             link: PAGE.OTHER_BONUS.path,
    //             parentId: 'other'
    //         },
    //         {
    //             id: 'finance',
    //             label: PAGE.OTHER_FINANCE.title,
    //             link: PAGE.OTHER_FINANCE.path,
    //             parentId: 'other'
    //         },
    //         {
    //             id: 'statistics',
    //             label: PAGE.OTHER_STATISTICS.title,
    //             link: PAGE.OTHER_STATISTICS.path,
    //             parentId: 'other'
    //         },
    //         {
    //             id: 'mailing',
    //             label: PAGE.OTHER_MAILING.title,
    //             link: PAGE.OTHER_MAILING.path,
    //             parentId: 'other'
    //         },
    //     ]
    // },

];

export { menuData };
