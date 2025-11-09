import { createConsumer } from "@rails/actioncable"

const url = `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}/cable`

const consumer = createConsumer(url)

export default consumer

