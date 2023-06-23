"use client"
import React, { useEffect } from 'react'
import {useSearchParams} from 'next/navigation'
async function getPostDetails(id, path) {
    const res = await fetch(`https://cms.cloudmeshsolutions.com/api/blog/${id}?pagePath=${path}`)
    const details = await res.json()
   
    return details
  }
const Page = ({params}) => {
    const searchParams = useSearchParams()
    const pagePath = searchParams.get("pagePath")
    useEffect(() => {
        const postDetail = async () => {
            const post = await getPostDetails(params.id, pagePath)
            console.log("params: ", post)
        }
        postDetail()
    }, [])
  return (
    <div>Posd id {params.id} and page path {pagePath}</div>
  )
}

export default Page