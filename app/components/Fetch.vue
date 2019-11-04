<script>
    export default {
        name: 'Fetch',
        props: {
            url: String
        },
        data() {
            return {
                name: '',
                temp: '',
                min: '',
                max: '',
                description: '',
                country: '',
                image: '',
                cod: ''
            }
        },
        created() {
            fetch(this.url)
                .then(response => {
                    return response.json()
                })
                .then(result => {
                    console.log(result)
                    this.name = result.name
                    this.temp = Math.round(result.main.temp).toString() + '°'
                    this.max = Math.round(result.main.temp_max).toString() + '°'
                    this.mix = Math.round(result.main.temp_min).toString() + '°'
                    this.description = result.weather[0].description
                    this.country = result.sys.country,
                    this.cod = result.cod
                })
                .catch(err => {
                    console.log(err)
                })
        },
        methods: {
            setImage(description) {
                if (description.includes('rain') || description.includes('thunderstorm') || description.includes('drizzle')) {
                    return "~/images/rain.png"
                } else if (description.includes('broken') && description.includes('clouds') || description.includes('few clouds')) {
                    return "~/images/suncloud.png"
                } else if (description.includes('clouds')) {
                    return "~/images/cloud.png"
                } else if (description.includes('snow') || description.includes('sleet') || description.includes('mist') || description.includes('drizzle') || description.includes('haze')) {
                    return "~/images/suncloud.png"
                } else if (description.includes('clear')) {
                    return "~/images/sun.png"
                }

                return ""
            }
        },
        render() {
            return this.$scopedSlots.default({
                name: this.name,
                temp: this.temp,
                max: this.max,
                min: this.mix,
                description: this.description,
                country: this.country,
                image: this.setImage(this.description),
                cod: this.cod
            })
        }
    }
</script>