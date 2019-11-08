import { fetchForecast } from './upstream'
import Forecast from './components/Forecast'

export const fetch = {
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
                        this.$navigateTo(Forecast, {
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