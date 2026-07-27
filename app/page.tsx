"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/app/lib/supabase";

export default function Dashboard() {
  const [stats, setStats] = useState({
    books: 0,
    students: 0,
    issued: 0,
    returned: 0,
    overdue: 0,
  });

  useEffect(() => {
    void loadStats();
  }, []);

  const loadStats = async () => {
    const data = await getDashboardStats();
    setStats(data);
  };



return(

<div className="p-8">


<h1 className="text-3xl font-bold mb-8">
Library Dashboard
</h1>



<div className="grid grid-cols-1 md:grid-cols-3 gap-6">



<Card
title="Total Books"
value={stats.books}
icon="📚"
/>



<Card
title="Total Students"
value={stats.students}
icon="👨‍🎓"
/>



<Card
title="Issued Books"
value={stats.issued}
icon="📖"
/>



<Card
title="Returned Books"
value={stats.returned}
icon="📥"
/>



<Card
title="Overdue Books"
value={stats.overdue}
icon="⚠️"
/>


</div>


</div>

)


}



function Card({title,value,icon}:any){

return(

<div className="
bg-white
shadow-md
rounded-xl
p-6
border
">


<div className="text-4xl">
{icon}
</div>


<h2 className="text-gray-500 mt-3">
{title}
</h2>


<p className="text-3xl font-bold mt-2">
{value}
</p>


</div>


)

}