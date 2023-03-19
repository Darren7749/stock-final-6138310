import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {

  const [supplier, setSupplier] = useState([]);

  useEffect(() => {
    // fetch data from API
    fetch("/api/supplier/info")
      .then(res => res.json())
      .then(data => {
        // do something with data
        console.log(data)
        setSupplier(data)
      })
  }, [])

  function deleteBlog(id) {
    fetch(`http://localhost:3000/api/blogs/articles/${id}`,
    {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      alert("Deleting " + id)
    })
  }

  return (
    <>
      <Head>
        <title>supplier</title>
      </Head>
      <h1>Supplier</h1>
      <ul>
        {
          supplier.map(supplier => {
            return (
              <Link href={`/supplier/${supplier._id}`}>
                <li key={supplier._id}> {supplier.title}</li>
              </Link>
            )
          })
        }
      </ul>
      <p>
      </p>
    </>
  )
}
