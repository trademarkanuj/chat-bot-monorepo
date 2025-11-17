import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Message
from .gemini_client import client, MODEL_NAME

@csrf_exempt
def chat_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        user_message = data.get("message", "").strip()
        if not user_message:
            return JsonResponse({"error": "message is required"}, status=400)

        try:
            gemini_response = client.models.generate_content(
                model=MODEL_NAME,
                contents=user_message,
            )
            reply_text = gemini_response.text
        except Exception as e:
            return JsonResponse({"error": f"Gemini error: {e}"}, status=500)

        msg = Message.objects.create(
            user_message=user_message,
            bot_response=reply_text,
        )

        return JsonResponse({
            "id": msg.id,
            "user_message": msg.user_message,
            "bot_response": msg.bot_response,
            "created_at": msg.created_at.isoformat(),
        })

    if request.method == "GET":
        messages = Message.objects.order_by("created_at")
        data = [
            {
                "id": m.id,
                "user_message": m.user_message,
                "bot_response": m.bot_response,
                "created_at": m.created_at.isoformat(),
            }
            for m in messages
        ]
        return JsonResponse(data, safe=False)

    return JsonResponse({"error": "Method not allowed"}, status=405)
