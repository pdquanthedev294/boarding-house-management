import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCheck,
  CreditCard,
  Activity,
  Mail,
  FileText,
  MessageSquare,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["main"]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const menuItems = [
    {
      section: "main",
      title: "Quản lý chính",
      items: [
        {
          to: "/admin/dashboard",
          label: "Tổng quan",
          icon: LayoutDashboard,
        },
        {
          to: "/admin/rooms",
          label: "Danh sách phòng",
          icon: Building2,
        },
        {
          to: "/admin/users",
          label: "Người dùng",
          icon: Users,
        },
        {
          to: "/admin/customers",
          label: "Khách hàng",
          icon: UserCheck,
        },
      ],
    },
    {
      section: "finance",
      title: "Tài chính",
      items: [
        {
          to: "/admin/transactions",
          label: "Giao dịch",
          icon: CreditCard,
        },
      ],
    },
    {
      section: "communication",
      title: "Liên lạc",
      items: [
        {
          to: "/admin/mails",
          label: "Gửi email",
          icon: Mail,
        },
        {
          to: "/admin/email-logs",
          label: "Lịch sử email",
          icon: FileText,
        },
        {
          to: "/admin/contact-requests",
          label: "Yêu cầu liên hệ",
          icon: MessageSquare,
        },
      ],
    },
    {
      section: "system",
      title: "Hệ thống",
      items: [
        {
          to: "/admin/roles",
          label: "Nhóm quyền",
          icon: Settings,
        },
        {
          to: "/admin/activity-logs",
          label: "Nhật ký hoạt động",
          icon: Activity,
        },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">BoardingHouse</h2>
            <p className="text-xs text-slate-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {menuItems.map((section) => (
            <div key={section.section} className="space-y-1">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.section)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <span>{section.title}</span>
                {expandedSections.includes(section.section) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {/* Section Items */}
              {expandedSections.includes(section.section) && (
                <div className="ml-2 space-y-1">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center space-x-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group",
                          isActive
                            ? "bg-violet-50 text-violet-700 border-r-2 border-violet-600"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon
                            className={cn(
                              "h-5 w-5 transition-colors",
                              isActive
                                ? "text-violet-600"
                                : "text-slate-400 group-hover:text-slate-600"
                            )}
                          />
                          <span>{item.label}</span>
                          {isActive && (
                            <div className="ml-auto w-2 h-2 bg-violet-600 rounded-full"></div>
                          )}
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
              <Settings className="h-4 w-4 text-violet-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-slate-900">Cần hỗ trợ?</p>
              <p className="text-xs text-slate-500">Liên hệ admin</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
