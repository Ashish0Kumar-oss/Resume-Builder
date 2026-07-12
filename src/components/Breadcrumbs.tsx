import { PageId } from "../types";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  pageId?: PageId;
  slug?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (page: PageId, slug?: string) => void;
}

export default function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  return (
    <nav className="flex py-3 px-4 mb-6 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-500 no-print" aria-label="Breadcrumb" id="breadcrumb-nav">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 list-none p-0 m-0" itemScope itemType="https://schema.org/BreadcrumbList">
        {/* Home Item */}
        <li className="inline-flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <button
            onClick={() => onNavigate("home")}
            className="inline-flex items-center text-slate-600 hover:text-blue-600 font-medium transition-colors cursor-pointer"
            itemProp="item"
          >
            <Home className="mr-2 h-4 w-4" />
            <span itemProp="name">Home</span>
          </button>
          <meta itemProp="position" content="1" />
        </li>

        {/* Dynamic Items */}
        {items.map((item, index) => {
          const position = index + 2;
          return (
            <li key={index} className="inline-flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <ChevronRight className="mx-1.5 h-4 w-4 text-slate-300" />
              {item.active || !item.pageId ? (
                <span className="text-slate-900 font-medium truncate max-w-[200px] sm:max-w-[400px]" itemProp="name">
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => onNavigate(item.pageId!, item.slug)}
                  className="text-slate-600 hover:text-blue-600 font-medium transition-colors cursor-pointer"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </button>
              )}
              <meta itemProp="position" content={position.toString()} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
