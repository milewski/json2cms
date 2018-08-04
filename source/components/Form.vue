<template>
  <div>
      oioi
  </div>
</template>

<script lang="ts">

    export default {
        components: {
        },
        props: {
            table: {
                required: true,
                type: String
            },
            parsers: {
                required: true,
                type: Object
            }
        },
        beforeRouteEnter(to, from, next) {

            const params = new URLSearchParams()
            params.append('table', to.name)

            fetch('/api/data?' + params)
                .then(response => {
                    if (response.ok) return response.json()
                })
                .then(data => {
                    next(instance => {
                        instance.form = data
                    })
                })

        },
        beforeMount() {
            for (let key in this.parsers) {
                // this.form[ key ] = this.initial[ key ]
                this.inputs.push(
                    { component: this.parsers[ key ], label: key }
                )
            }
        },
        data() {
            return {
                inputs: [],
                form: {}
            }
        },
        methods: {
            onSubmit() {
                fetch('/api', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        table: this.table,
                        data: this.form
                    })
                }).then(response => {
                    if (response.ok) {
                        response.json().then(data => {
                            console.log(data)
                        })
                    }
                })
            },
            onCancel() {
                // this.$refs.form.resetFields() why this is not working?
                this.form = {}
            }
        }
    }

</script>
