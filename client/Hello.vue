<template>
    <div>
        <h1>Demo Application meteor</h1>
        <div v-if="isCordova">
            <p>Vous êtes sur portable</p>
            <p v-if="granted">Acces à l'appareil photo est autorisé</p>
            <p v-else>Accès non autorisé</p>
            <p>{{message}}</p>
            <button @click="cameraClicked">Prendre une photo</button>
        </div>
    <div v-else>
        <p>Vous êtes sur navigateur</p>
    </div>
    </div>
</template>

<script>
export default {
    data() {
       return {
            granted: false,
            message: ""
       }
    },

    methods: {
        cameraClicked(){
            cordova.plugins.camera.getPicture(
                success => {
                    this.message = "Photo prise";
                },
                error => {
                    console.log("une erreur est survenue"+error);
                }
            )
        }
    },

    computed: {
        isCordova(){
            return Meteor.isCordova;
        }
    },

    created() {
        if (this.isCordova) {
            cordova.plugins.diagnostic.isCameraAuthorized(
                authorized => {
                    if (!authorized) {
                        cordova.plugins.diagnostic.requestCameraAuthorization(
                            granted => {
                                console.log("Authorization request for camera use was " +
                                    (granted ? "granted" : "denied"));
                            },
                            error => { console.error(error); }
                        );
                    }
                },
                error => { console.error(error); }
            );
        }
    }
}
</script>
