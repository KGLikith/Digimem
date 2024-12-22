import {
  Clock,
  Hash,
  BookOpen,
  Globe,
  Share2,
  Camera,
  Users,
  Lock,
} from "lucide-react";

const GridSection = () => {
  return (
    <section
      id="features"
      className="z-10 bg-gradient-to-br from-gray-300 to-gray-100 border-gray-200 mx-8 my-8 rounded-3xl dark:bg-zinc-900 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900"
    >
      <div className="w-full relative  flex justify-around flex-col pt-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white sm:text-center sm:text-5xl text-center">
          Features
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 md:py-20  py-10 md:pt-5 pt-5 mx-auto">
          <GridItem
            icon={<Clock className="text-blue-500" />}
            title="Timeline-Based Viewing"
            description="Organize and view your memories chronologically for a nostalgic journey through time."
          />
          <GridItem
            icon={<Hash className="text-green-500" />}
            title="Smart Tagging"
            description="Easily categorize and find memories with our intelligent tagging system."
          />
          <GridItem
            icon={<BookOpen className="text-purple-500" />}
            title="Memory Blogging"
            description="Transform your memories into captivating stories with our built-in blogging feature."
          />
          <GridItem
            icon={<Globe className="text-amber-500" />}
            title="World Map Integration"
            description="Visualize your memories on a world map and relive your adventures geographically."
          />
          <GridItem
            icon={<Share2 className="text-red-500" />}
            title="Social Media Integration"
            description="Seamlessly import and share memories across your favorite social platforms."
          />
          <GridItem
            icon={<Camera className="text-indigo-500" />}
            title="Multi-Media Support"
            description="Store and display various types of media including photos, videos, and audio recordings."
          />
          <GridItem
            icon={<Users className="text-pink-500" />}
            title="Collaborative Albums"
            description="Create shared albums and collaborate on memories with friends and family."
          />
          <GridItem
            icon={<Lock className="text-gray-500" />}
            title="Privacy Controls"
            description="Manage the privacy of your memories with granular access controls and secure sharing options."
          />
        </div>
      </div>
    </section>
  );
};

interface GridItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const GridItem = ({ icon, title, description }: GridItemProps) => (
  <div className="flex flex-col lg:border-r py-10 relative group lg:border-b border-gray-300  dark:border-neutral-800">
    <div className="opacity-0 group-hover:opacity-100 dark:group-hover:opacity-100  transition duration-200 group  absolute inset-0 h-full w-full bg-gradient-to-r from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none"></div>
    <div className="mb-4 relative z-10 px-10">{icon}</div>
    <div className="text-lg font-bold mb-2 relative z-10 px-10">
      <div className="absolute left-0 inset-y-0 h-6 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover:bg-blue-500 transition duration-200"></div>
      <span className="group-hover:translate-x-2 transition duration-200 inline-block text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-gray-300">
        {title}
      </span>
    </div>
    <p className="text-sm text-slate-700 dark:text-slate-300 max-w-xs mx-auto relative z-10 px-10">
      {description}
    </p>
  </div>
);

export default GridSection;
