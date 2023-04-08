export default function Contact() {
  return (
    <>
      <form name="contact" method="POST"
        data-netlify="true"
      >
        {/* action="/thankyou" */}
        {/* netlify-honeypot="bot-field" netlify */}
        <input type="hidden" name="form-name" value="contact" />
        <p className="mt-2">
          <label className="block float-left w-20">
            名前：
          </label>
            <input type="text" name="name" required
              className="box-border border-2 border-gray-400 rounded-lg"
            />
        </p>
        <p className="mt-2">
          <label className="block float-left w-20">
            Eメール：
          </label>
            <input type="email" name="email"  required
              className="box-border border-2 border-gray-400 rounded-lg"
              />
        </p>
        <p className="mt-2">
          <label className="block float-left w-20">
            内容：
          </label>
            <textarea  name="content" cols="50" rows="10"  required
              className="box-border border-2 border-gray-400 rounded-lg"
              />
        </p>
        <p className="my-2">
          <button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white rounded px-4 py-2">送　信</button>
        </p>
      </form>
    </>
  )
}
