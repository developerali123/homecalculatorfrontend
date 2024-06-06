import React from 'react';
import { text1, text2, text3, text4 } from '../assets';

const Data = () => {
    return (
        <div className='w-full flex max-md:flex-col justify-evenly gap-3'>
            <img src={text1} alt="text1" className='hidden lg:block absolute left-[160px] top-[400px]' />
            <img src={text2} alt="text2" className='hidden lg:block absolute right-[140px] top-[800px]' />
            <img src={text3} alt="text3" className='hidden lg:block absolute left-[130px] top-[1600px]' />
            <img src={text4} alt="text4" className='hidden lg:block absolute right-[150px] top-[2100px]' />
            <div className='grid grid-cols-12 gap-6'>
                <div className='border-dashed border md:col-span-6 col-span-12 border-black flex flex-col gap-5 items-center p-10 mb-4' style={{ borderWidth: '2px', borderStyle: 'dashed', borderRadius: '8px' }} >
                    <h1 className='underline text-3xl font-semibold'>עשה זאת בעצמך (DIY)</h1>
                    <p className='text-sm text-center'>הנה טיפ פשוט שיכול לעשות הבדל גדול - פירוק והרכבת הרהיטים בעצמך!</p>
                    <p className='text-sm text-center'>רבות מחברות הובלה גובות תשלום נוסף עבור הובלת רהיטים גדולים ומורכבים, מאחר שזה מחייב זמן עבודה נוסף וצוות מיומן.</p>
                    <h2 className='underline text-xl font-semibold'>יתרונות</h2>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>1</p>
                        <p className='text-right'>חסכון בעלויות - פירוק והרכבת הרהיטים בעצמך יכול לחסוך לך באופן משמעותי בעלויות ההובלה. רבות מחברות הובלה מוסיפות בין 100%-150% ממחיר הפריט לעלות ההובלה, עבור שירותים אלו. לכן, ביצועם באופן עצמאי יכול להוריד את עלות המעבר כולו בעשרות אחוזים.</p>
                    </div>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>2</p>
                        <p className='text-right'>שליטה נוספת - פירוק והרכבת הרהיטים בעצמך נותנת לך שליטה נוספת על תהליך ההובלה. תוכל לבחור מתי ואיך לפרק ולהרכיב את הרהיטים, ולוודא שזה נעשה בצורה נכונה ובטוחה.</p>
                    </div>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>3</p>
                        <p className='text-right'>שרידי המעבר - לא כל הרהיטים מסוגלים לשרוד את המעבר בצורה בטוחה. פירוק והרכבת הרהיטים בעצמך יכולה להיות הזדמנות מצוינת לבדוק את מצבם של הרהיטים לפני ביצוע פעולות נוספות, ולחסוך לך לב כאב וגם כסף.</p>
                    </div>
                    <h2 className='underline text-xl font-semibold mb-5'>כך זה נעשה!</h2>

                    <h3 className='text-xl font-semibold'>מחפש חבר שמיודע</h3>
                    <p className='mb-5 text-center'>שאל חברים או משפחה לעזרה פירוק והרכבת הרהיטים יכולה להיות קלה יותר עם עזרה נוספת.</p>

                    <h3 className='text-xl font-semibold'>צופים ולומדים</h3>
                    <p className='mb-5 text-center'>צפו בתעודות וידאו באינטרנט יש המון סרטוני וידאו באינטרנט שמראים כיצד לפרק ולהרכיב סוגים שונים של רהיטים.</p>

                    <h3 className='text-xl font-semibold'>מתחילים בקטן</h3>
                    <p className='mb-5 text-center'>התחל עם רהיטים קטנים. התחל עם רהיטים קטנים שקל לפרק ולהרכיב לפני שתעבור לרהיטים גדולים ומורכבים יותר.</p>
                </div>

                <div className='border-[2px] md:col-span-6 col-span-12 border-dotted border-black rounded-xl flex flex-col gap-5 items-center p-10' style={{ borderWidth: '2px', borderStyle: 'dashed', borderRadius: '8px' }}>
                    <h1 className='underline text-3xl font-semibold'>אריזה כמו מקצוען</h1>
                    <p className='text-sm text-center'>האריזה העצמית של רהיטים וקרטונים עשויה להשמע כמשימה מסובכת, אך זה יכול להיות פעילות כיפית ואף מזדמנת!</p>
                    <h2 className='underline text-xl font-semibold'>יתרונות</h2>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>1</p>
                        <p className='text-right'><span className='font-semibold'>חסכון משמעותי</span> - האריזה העצמית יכולה <span className='font-bold'>לחסוך לך בין 10%-15%</span> מעלויות המשלוח.</p>
                    </div>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>2</p>
                        <p className='text-right'><span className='font-semibold'>סדר וארגון</span> - תהליך האריזה מאפשר לך לארגן את הדברים שלך בצורה אפקטיבית, כך שתדע בדיוק איפה כל דבר נמצא בדירה החדשה שלך.</p >
                    </div>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>3</p>
                        <p className='text-right'><span className='font-semibold'>חוויה משפחתית </span>- הפיכת האריזה לפרויקט משפחתי יכולה להיות פעילות גורמת ומהנה לכל חברי המשפחה.</p>
                    </div>

                    <h2 className='underline text-xl font-semibold mb-5'>כך זה נעשה!</h2>

                    <h3 className='text-xl font-semibold'>מחפש חבר שמיודע</h3>
                    <p className='mb-5 text-center'>שאל חברים או קרובי משפחה לעזרה פירוק והרכבת רהיטים יכולה להיות קלה יותר עם עזרה נוספת.</p>

                    <h3 className='text-xl font-semibold'>צופים ולומדים</h3>
                    <p className='mb-5 text-center'>צפו בתעודות וידאו באינטרנט יש המון סרטוני וידאו באינטרנט שמראים כיצד לפרק ולהרכיב סוגים שונים של רהיטים.</p>

                    <h3 className='text-xl font-semibold'>מתחילים בקטן</h3>
                    <p className='mb-5 text-center'>התחל עם רהיטים קטנים התחל עם רהיטים קטנים שקל לפרק ולהרכיב לפני שתעבור לרהיטים גדולים ומורכבים יותר.</p>
                </div>

                <div className='border-[2px] md:col-span-6 col-span-12 border-dotted border-black rounded-xl flex flex-col gap-5 items-center p-10 mb-4' style={{ borderWidth: '2px', borderStyle: 'dashed', borderRadius: '8px' }}>
                    <h1 className='underline text-3xl font-semibold'>הגמישות היא המפתח!</h1>
                    <p className='text-sm text-center'>
                        רבות מחברות הובלה מתכננות את סדר העבודה שלהן מראש, אך יתכן ותקבל
                        <br />
                        ביטולים או שינויים בדקה האחרונה. זה הזדמנות נהדרת עבורך לחסוך באופן משמעותי בעלויות המשלוח!
                    </p>
                    <h2 className='underline text-xl font-semibold'>כיצד זה עובד?!</h2>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>1</p>
                        <p className='text-right'>מילוי חורים בלוח זמנים - חברות הובלה מעדיפות למלא חורים בלוח זמנים <span className='font-bold'>במחיר שנמוך כ-20%</span> מאשר להשאיר עובדים בריקים. המשלוח שלך, גם במחיר מוזל, יעזור להם להשתמש בזמן העבודה של צוות ההובלה בצורה יעילה יותר.</p>
                    </div>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>2</p>
                        <p className='text-right'><span className='font-bold'>חיסכון בעלויות שכר</span> - חברות הובלה משלמות לעובדיהן לפי שעה. ביטול המשלוח עשוי להוביל למצב שבו העובדים יהיו זמינים ללא עבודה. המשלוח שלך במחיר נמוך יאפשר לחברת הובלה להשתמש בזמן העבודה של צוות ההובלה ולהימנע מתשלום שכר לא נחוץ.</p>
                    </div>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>3</p>
                        <p className='text-right'><span className='font-bold'>מניעת ימי "נמוכים"</span> - רבות מחברות הובלה מתמלאות בימי ראשון, סופי שבוע וחודשי הקיץ. הזמנת הובלה בימים "נמוכים" כמו בימי השבוע או בעונות מעבר יכולה להוריד באופן משמעותי את העלויות.</p>
                    </div>

                    <h2 className='underline text-xl font-semibold mb-5'>כך זה עובד!</h2>

                    <h3 className='text-xl font-semibold'>גמישות, גמישות ועוד גמישות</h3>
                    <p className='mb-5 text-center'>הכינות להעביר את תאריך המשלוח במספר ימים או בשעות לא פופולריות. זמינותך תגביר את הסיכוי למצוא מחיר מוזל.</p>

                    <h3 className='text-xl font-semibold'>הזמנה מראש</h3>
                    <p className='mb-5 text-center'>ככל שתזמין את המשלוח מראש, כך יש סיכוי גדול יותר למצוא תאריך נוח במחיר מוזל.</p>

                    <h3 className='text-xl font-semibold'>מגרש עסקים</h3>
                    <p className='mb-5 text-center'>הצג את גמישותך בתאריכים ובשעות כתף כתפו בשיחות עם חברת הובלה. הבהר לחברה כי אתה מוכן להעביר את המשלוח בתמורה למחיר מוזל.</p>
                </div>

                <div className='border-[2px] md:col-span-6 col-span-12 border-dotted border-black rounded-xl flex flex-col gap-5 items-center p-10 ' style={{ borderWidth: '2px', borderStyle: 'dashed', borderRadius: '8px' }}>

                    <h1 className='underline text-3xl font-semibold'>הצטרף למסע</h1>
                    <p className='text-sm text-center'>חברות הובלה גובות תשלום נוסף עבור העברות מורכבות, כמו העברה בקומות גבוהות ללא מעלית, העברה דרך רחבות צרות או העברה הדורשת נשיאת פריטים על מרחק ארוך.</p>
                    <h2 className='underline text-xl font-semibold'>כיצד זה עובד?!</h2>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>1</p>
                        <p className='text-right'><span className='font-semibold'></span></p>
                        <p className='text-right'><span className='font-semibold'></span><span className='font-bold'></span></p>
                        <p className='text-right bg-red-400'><span className='font-semibold'>הנחת שירותי פורטר</span> - חברות הובלה גובות תשלום נוסף עבור <span className='font-bold'>נשיאת פריטים כבדים</span> או רגישים במיוחד, כמו <span className='font-bold'>פסלים, כיסאות מסאז' וארגזי נפט.</span></p>
                    </div>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>2</p>
                        <p className='text-right'><span className='font-semibold'>שכירות טרקטור או מלגזה</span> - חברות הובלה גובות תשלום נוסף עבור העברה באמצעות טרקטור, מלגזה או כל כלי רכב נוסף. המחיר הזול עשוי להיות הנחת חברת הובלה לקוחות שיש להם גישה לכלי רכב אלו.</p>
                    </div>
                    <div className='flex gap-2'>
                        <p className='text-2xl'>3</p>
                        <p className='text-right'><span className='font-semibold'>העברה במעלית </span>- חברות הובלה גובות תשלום נוסף עבור העברה במעלית. הגעת הפריטים לקומות העליונים של הבניין או העברה דרך מעליות קטנות יכולה להוסיף תוספת עלותית לך.</p>
                    </div>

                    <h2 className='underline text-xl font-semibold mb-5'>כך זה עובד!</h2>

                    <h3 className='text-xl font-semibold'>קבל תמורה על העלויות הנוספות</h3>
                    <p className='mb-5 text-center'>קבל הצעה נוספת ממקור נוסף על סמך העלויות הנוספות, כך שתוכל להשוות מחירים ולבחור באפשרות המשתלמת ביותר.</p>

                    <h3 className='text-xl font-semibold'>שקל אפשרויות פיצוי</h3>
                    <p className='mb-5 text-center'>אם אתה מקבל תשלום עבור פיצויים על ההעברה הנוספת, שקול לבחון את האפשרויות השונות ולבחור את האופציה המשתלמת ביותר לך.</p>

                    <h3 className='text-xl font-semibold'>שקול פטורים</h3>
                    <p className='mb-5 text-center'>במקרים מסוימים, כגון העברה בתוך אותו קומה או במרחק קצר מאוד, שקול לבקש פטור מתשלום נוסף עבור ההעברה.</p>

                </div>
            </div>
        </div>

    );
};

export default Data;