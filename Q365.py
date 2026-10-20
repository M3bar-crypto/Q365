import json
import os
from datetime import datetime
from dotenv import load_dotenv
from groq import Groq
from supabase import Client, create_client

GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

groq_client = Groq(api_key=GROQ_API_KEY)
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def generate_daily_question():
    today_date = datetime.now().strftime("%Y-%m-%d")
    print(f"🔄 جاري بدء عملية التوليد لتاريخ: {today_date}")

    check_exist = (
        supabase.table("questions")
        .select("id")
        .eq("publish_date", today_date)
        .execute()
    )
    if check_exist.data:
        print("⚠️ سؤال اليوم موجود مسبقاً! لن يتم توليد سؤال جديد.")
        return

    prompt = """
    أنت صانع أسئلة محترف لمسابقة ثقافة عامة يومية.
    المطلوب منك إنشاء سؤال ثقافي ممتع ومعلومة قيمة، بشرط أن تكون الإجابة عبارة عن كلمة واحدة فقط.
    
    قم بإرجاع النتيجة بتنسيق JSON حصراً بدون أي مقدمات أو نصوص إضافية، بالشكل التالي:
    {
        "question_ar": "نص السؤال بالعربي",
        "question_en": "نص السؤال بالإنجليزي",
        "answers": ["الإجابة بالعربي", "الإجابة بالإنجليزي"],
        "explanation_ar": "شرح مختصر ومفيد عن المعلومة بالعربي (سطرين بالكتير)",
        "explanation_en": "شرح مختصر ومفيد عن المعلومة بالإنجليزي (سطرين بالكتير)"
    }
    """

    try:
        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "أنت ترجع البيانات دائماً بتنسيق JSON فقط.",
                },
                {"role": "user", "content": prompt},
            ],
            response_format={"type": "json_object"},
        )

        result_json = json.loads(response.choices[0].message.content)

        new_row = {
            "publish_date": today_date,
            "question_ar": result_json["question_ar"],
            "question_en": result_json["question_en"],
            "answers": result_json["answers"],
            "explanation_ar": result_json["explanation_ar"],
            "explanation_en": result_json["explanation_en"],
        }

        insert_response = supabase.table("questions").insert(new_row).execute()

        print("✅ تم توليد سؤال اليوم وحفظه بنجاح!")
        print("البيانات المخزنة:", insert_response.data)

    except Exception as e:
        print(f"❌ حدث خطأ أثناء التوليد أو الحفظ: {e}")

if __name__ == "__main__":
    generate_daily_question()
