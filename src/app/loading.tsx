import { Loader2 } from "lucide-react"

export default function AdminLoading() {
  return (
    <div className="flex justify-center">
      <Loader2 className="size-24 animate-spin" />
    </div>
  )
}

// lucide-react n'a pas eu besoin d'installation car déjà prise en charge par next.js