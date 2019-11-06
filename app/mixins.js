import { fetchForecast } from './upstream'
import Weather from './components/Weather'

export const mixin = {
    data() {
        return {
            locationError: false,
            locErrorMessage: ''
        }
    },
    methods: {
        getData(url) {
            fetchForecast(url)
                .then(data => {
                    if (data.cod === 200) {
                        this.$navigateTo(Weather, {
                            transition: {
                                name: 'fade'
                            },
                            props: {
                                response: data
                            }
                        })
                    } else {
                        this.locationError = true,
                        this.locErrorMessage = data.message + ' 😢'
                    }
                })
                .catch(err => {
                    this.locationError = true,
                    this.locErrorMessage = 'unsupported symbol 😢'
                })
        }
    }
}