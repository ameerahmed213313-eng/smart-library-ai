"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

import { getBooks } from "@/app/lib/supabase";


export default function LibraryCharts(){

  const [subjectData,setSubjectData] = useState<any[]>([]);
  const [statusData,setStatusData] = useState<any[]>([]);


  useEffect(()=>{

    async function getChartData(){


      // Books by subject

      const books = await getBooks();

      if(books){

        const subjects:any = {};

        books.forEach((book)=>{

          if(book.subject){

            subjects[book.subject] =
            (subjects[book.subject] || 0) + 1;

          }

        });


        const chart = Object.keys(subjects)
        .map((key)=>({
          subject:key,
          books:subjects[key]
        }))
        .slice(0,10);


        setSubjectData(chart);


        const available =
        books.filter(
          (b)=>b.status==="Available"
        ).length;


        const issued =
        books.filter(
          (b)=>b.status==="Issued"
        ).length;


        setStatusData([
          {
            name:"Available",
            value:available
          },
          {
            name:"Issued",
            value:issued
          }
        ]);

      }


    }


    getChartData();


  },[]);



return (

<div className="grid md:grid-cols-2 gap-6 mt-8">


<div className="bg-white rounded-xl shadow p-5">

<h2 className="font-bold text-xl mb-4">
Books By Subject
</h2>


<ResponsiveContainer width="100%" height={300}>

<BarChart data={subjectData}>

<XAxis dataKey="subject"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="books"/>

</BarChart>

</ResponsiveContainer>


</div>



<div className="bg-white rounded-xl shadow p-5">

<h2 className="font-bold text-xl mb-4">
Book Status
</h2>


<ResponsiveContainer width="100%" height={300}>

<PieChart>

<Pie
data={statusData}
dataKey="value"
nameKey="name"
outerRadius={100}
>

{
statusData.map((item,index)=>(
<Cell key={index}/>
))
}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>


</div>
Charts

</div>

);

}