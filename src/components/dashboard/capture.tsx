import { useState, type KeyboardEvent } from "react";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";
import { ArrowUpRight, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useOps } from "@/lib/store";
import { Panel } from "./panel";

export function CapturePanel({ className }: { className?: string }) {
  const captures = useOps((s) => s.captures);
  const add = useOps((s) => s.addCapture);
  const promote = useOps((s) => s.promoteCapture);
  const remove = useOps((s) => s.removeCapture);
  const [text, setText] = useState("");

  function save() {
    const trimmed = text.trim();
    if (!trimmed) return;
    add(trimmed);
    setText("");
    toast.success("In der Inbox abgelegt");
  }

  function onKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      save();
    }
  }

  return (
    <Panel className={className} title="Quick Capture">
      <Textarea
        id="quick-capture"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKey}
        placeholder="Idee, Task, Gedanke … Enter speichert"
        rows={3}
      />
      <div className="mt-2 flex justify-end">
        <Button size="sm" onClick={save} disabled={!text.trim()}>
          Ablegen
        </Button>
      </div>
      <ul className="mt-3 flex max-h-64 flex-col gap-1.5 overflow-auto">
        {captures.length === 0 ? (
          <li className="text-sm text-muted">Inbox leer. Alles sortiert.</li>
        ) : (
          captures.map((item) => (
            <li
              key={item.id}
              className="group flex items-start gap-2 rounded-md bg-surface-2 px-2 py-2"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm break-words">{item.text}</p>
                <p className="mt-0.5 font-mono text-[10px] text-subtle">
                  {formatDistanceToNow(item.createdAt, {
                    addSuffix: true,
                    locale: de,
                  })}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                title="Als Task für heute"
                onClick={() => promote(item.id, item.text.slice(0, 80))}
              >
                <ArrowUpRight className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                className="opacity-70 group-hover:opacity-100"
                onClick={() => remove(item.id)}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </li>
          ))
        )}
      </ul>
    </Panel>
  );
}
