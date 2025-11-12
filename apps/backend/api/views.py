from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
import json, os
import google.generativeai as genai

def home(request):
    return render(request, "home.html")

def messages(request):
    return JsonResponse([
        {"role": "user", "reply": "Hello"},
        {"role": "assistant", "reply": "Hi there"},
    ], safe=False)

@csrf_exempt
def chat(request):
    if request.method != "POST":
        return JsonResponse({"error":"POST required"}, status=400)
    try:
        data = json.loads(request.body)
    except:
        return JsonResponse({"error":"Invalid JSON"}, status=400)

    message = data.get("message","")
    api_key = os.getenv("GOOGLE_API_KEY","")
    model_name = os.getenv("GEMINI_MODEL","gemini-2.0-flash")

    if not api_key:
        return JsonResponse({"reply": f"(dev) you said: {message}", "model": model_name,"role": "assistant"})

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(model_name)
    resp = model.generate_content(message)
    text = resp.text if hasattr(resp, "text") else ""
    return JsonResponse({"reply": text, "model": model_name,"role": "assistant"})
