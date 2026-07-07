import Header from "@/components/Main/Header";

import TaskBoard from "./elements/TaskBoard";
import Sidebar from "@/components/Main/Sidebar";

export default function TasksPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100 p-4">
      <div className="flex h-full w-full overflow-hidden rounded-2xl bg-white shadow-sm">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header />
          <TaskBoard />
        </div>
      </div>
    </div>
  );
}
