import { PointerHighlight } from "@/components/ui/pointer-highlight";
 
export default function PointerHighlightDemo() {
  return <div className="max-w-7xl mx-auto py-20 px-4">
  <h1 className="text-center m-auto text-4xl text-sidebar-ring font-bold font-serif">What I Help With</h1>
  <p className="text-center mt-4 text-lg text-neutral-600">I help individuals, startups, and businesses turn their ideas into modern, scalable, and user-friendly web applications. From designing intuitive user interfaces to developing full-stack solutions, I focus on delivering seamless digital experiences that drive real impact.</p>
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 py-20 sm:grid-cols-2 ">
      <div className="rounded-md p-6">
        <div className="h-40 w-full rounded-lg bg-linear-to-r from-blue-200 to-sky-200 flex items-center justify-center" >
            <span className="text-9xl">💻</span>
            </div>
        <div className="mx-auto mt-4 max-w-lg text-base font-bold tracking-tight md:text-base">
          <PointerHighlight
            rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 leading-loose"
            pointerClassName="text-yellow-500 h-3 w-3"
            containerClassName="inline-block mr-1"
          >
            <span className="relative z-10">Build responsive</span>
          </PointerHighlight>
         and high-performance websites and applications that engage users and drive results.
        </div>
       
      </div>
      <div className="rounded-md p-6">
        <div className="h-40 w-full rounded-lg bg-linear-to-r from-blue-200 to-purple-200 flex items-center justify-center" >
            <span className="text-9xl">🎨</span>
        </div>
        <div className="mx-auto mt-4 max-w-lg text-base font-bold tracking-tight md:text-base">
               Design clean and 

          <PointerHighlight
            rectangleClassName="bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700 leading-loose"
            pointerClassName="text-blue-500 h-3 w-3"
            containerClassName="inline-block mx-1"
          >
            <span className="relative z-10">user-friendly UI/UX </span>
          </PointerHighlight>
          interfaces that enhance user engagement and provide intuitive navigation, ensuring a seamless user experience across all devices.
        </div>
      </div>
      <div className="rounded-md p-6">
        <div className="h-40 w-full rounded-lg bg-linear-45 from-green-200 to-yellow-200 flex items-center justify-center" >
            <span className="text-9xl">🛠️</span>
        </div>
        <div className="mx-auto mt-4 max-w-lg text-base font-bold tracking-tight md:text-base">
         Develop full-stack web applications using modern technologies like
          <PointerHighlight
            rectangleClassName="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 leading-loose"
            pointerClassName="text-green-500 h-3 w-3"
            containerClassName="inline-block ml-1"
          >
            <span className="relative z-10"> React, Node.js, and MongoDB, </span>
          </PointerHighlight>
          <span>delivering robust and scalable solutions that meet your business needs while ensuring optimal performance and security.</span>
        </div>
      </div>
      <div className="rounded-md p-6">
        <div className="h-40 w-full rounded-lg bg-linear-45 from-green-200 to-yellow-200 flex items-center justify-center" >
            <span className="text-9xl">🔗</span>
        </div>
        <div className="mx-auto mt-4 max-w-lg text-base font-bold tracking-tight md:text-base">
         Integrate APIs and backend systems to
          <PointerHighlight
            rectangleClassName="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 leading-loose"
            pointerClassName="text-green-500 h-3 w-3"
            containerClassName="inline-block ml-1"
          >
            <span className="relative z-10">create seamless and efficient  </span>
          </PointerHighlight>
          <span> web applications that provide real-time data and enhance user experience. I specialize in working with technologies like React, Node.js, and MongoDB..</span>
        </div>
      </div>
    </div>
  </div>
}