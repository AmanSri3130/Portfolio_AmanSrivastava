import json
import os

path = r"C:\Users\AK\.gemini\antigravity-ide\brain\977969cf-e227-4bf2-a8d1-f8922e4db846\.system_generated\logs\transcript.jsonl"
with open(path, "r", encoding="utf-8", errors="ignore") as f:
    for line in f:
        try:
            step = json.loads(line)
            if step.get("step_index") == 98:
                tool_calls = step.get("tool_calls", [])
                for tc in tool_calls:
                    args = tc.get("args", {})
                    target_content = args.get("TargetContent") or args.get("targetContent")
                    replacement_content = args.get("ReplacementContent") or args.get("replacementContent")
                    print("TargetContent len:", len(target_content))
                    print("ReplacementContent len:", len(replacement_content))
                    
                    with open("target_content_98.txt", "w", encoding="utf-8") as out:
                        out.write(target_content)
                    with open("replacement_content_98.txt", "w", encoding="utf-8") as out:
                        out.write(replacement_content)
                    print("Saved both to text files!")
        except Exception as e:
            pass
