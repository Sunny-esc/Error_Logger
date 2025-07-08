import RecentActivity from './gitlog'
import SidecontentContainer from "../sidecontent";
import { TrendingUp, Activity, BarChart3, Users, Clock } from "lucide-react";

export default function Sidebar(){
    return(
        <>
         <div className="h-[80%] md:w-[32%] p-4 md:p-4 space-y-2">
            <div className="flex flex-col h-full ">
              <div className="text-xl w- md:text-2xl font-semibold mb-2 md:mb-4  border-b border-slate-500">
                Overview
              </div>
              <div className='mb-6'>
                <SidecontentContainer />
              </div>
              <div className=" rounded-2xl w-[17rem] bg-white border-slate-400 border  p-4 shadow-md">
                <h3 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </h3>
                <div className="">
                  <RecentActivity/>
                </div>
              </div>
            </div>
          </div>
        </>
    );
}