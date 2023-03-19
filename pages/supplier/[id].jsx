import Head from "next/head"
import Link from "next/link"

// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function supplier({ supplier }) {
  console.log('supplier', supplier)
  if (!supplier) return (
    <div>
      <p>supplier not found</p>
      <Link href="/supplier">Back</Link>
      </div>
  );

  return (
    <>
      <Head>
        <title>{supplier.title}</title>
      </Head>
      <p>{supplier.supplier_name}</p>
      <p>{supplier.address}</p>
      <p>{supplier.phone_number}</p>
      <Link href="/supplier">Back</Link>
    </>
  )
}

// STEP 1: This function will be executed at the server before loading the page.
// export async function getServerSideProps({ params }) {
//   console.debug('params', params)
//   const res = await fetch(`http://localhost:3000/api/supplier/info/${params.id}`)
//   const supplier = await res.json()
//   console.debug('supplier 1', supplier)
//   return { props: { supplier } }
// }

export async function getServerSideProps({ params }) {
  console.debug('params', params)
  try {
    const res = await fetch(`http://localhost:3000/api/supplier/info/${params.id}`)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const supplier = await res.json()
    console.debug('supplier 1', supplier)
    return { props: { supplier } }
  } catch (err) {
    console.error('Error fetching supplier data:', err);
    return { props: { supplier: null } }
  }
}
