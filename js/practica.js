   const CalculadoraDeArea = {
        data() {
            return {
                figuraSeleccionada: 'círculo',
                dimensiones: {}, 
                areaCalculada: null, 
            };
        },
        methods: {
            calcularArea() {
                let imagenFigura = ''; 

                if (this.figuraSeleccionada === 'círculo') {
                    const radio = parseFloat(this.dimensiones.radio);
                    this.areaCalculada = radio ? Math.PI * Math.pow(radio, 2) : 0;
                    imagenFigura = 'imagenes/circulo.png'; 
                } else if (this.figuraSeleccionada === 'cuadrado') {
                    const lado = parseFloat(this.dimensiones.lado);
                    this.areaCalculada = lado ? Math.pow(lado, 2) : 0;
                    imagenFigura = 'imagenes/cuadrado.png';
                } else if (this.figuraSeleccionada === 'triángulo') {
                    const base = parseFloat(this.dimensiones.base);
                    const altura = parseFloat(this.dimensiones.altura);
                    this.areaCalculada = base && altura ? (base * altura) / 2 : 0;
                    imagenFigura = 'imagenes/triangulo.png';
                }

                this.areaCalculada = this.areaCalculada ? this.areaCalculada.toFixed(2) : null;

                if (this.areaCalculada) {
                    this.$emit('agregar-figura', {
                        nombre: this.figuraSeleccionada,
                        area: this.areaCalculada,
                        imagen: imagenFigura, 
                    });
                }
            },
        },
        template: `
            <div>
                <select v-model="figuraSeleccionada" class="form-select mb-3">
                    <option value="círculo">Círculo</option>
                    <option value="cuadrado">Cuadrado</option>
                    <option value="triángulo">Triángulo</option>
                </select>
                <div v-if="figuraSeleccionada === 'círculo'">
                    <label for="radio">Radio:</label>
                    <input type="number" id="radio" v-model="dimensiones.radio" class="form-control mb-2">
                </div>
                <div v-if="figuraSeleccionada === 'cuadrado'">
                    <label for="lado">Lado:</label>
                    <input type="number" id="lado" v-model="dimensiones.lado" class="form-control mb-2">
                </div>
                <div v-if="figuraSeleccionada === 'triángulo'">
                    <label for="base">Base:</label>
                    <input type="number" id="base" v-model="dimensiones.base" class="form-control mb-2">
                    <label for="altura">Altura:</label>
                    <input type="number" id="altura" v-model="dimensiones.altura" class="form-control mb-2">
                </div>
                <button @click="calcularArea" class="btn btn-primary">Calcular Área</button>
                <p v-if="areaCalculada" class="mt-3">Área: {{ areaCalculada }}</p>
            </div>
        `,
    };


    const GaleriaDeFiguras = {
        data() {
            return {
                figuras: [],
            };
        },
        methods: {
            agregarFigura(figura) {
                this.figuras.push(figura);
            },
        },
        template: `
            <div class="row">
                <div class="col-md-4" v-for="(figura, index) in figuras" :key="index">
                    <div class="card mb-3">
                        <img :src="figura.imagen" class="card-img-top" alt="Imagen de la figura">
                        <div class="card-body">
                            <h5 class="card-title">{{ figura.nombre }}</h5>
                            <p class="card-text">Área: {{ figura.area }}</p>
                        </div>
                    </div>
                </div>
            </div>
        `,
    };

    const app = Vue.createApp({
        components: {
            'calculadora-de-area': CalculadoraDeArea,
            'galeria-de-figuras': GaleriaDeFiguras,
        },
        methods: {
            agregarFiguraAGaleria(figura) {
                this.$refs.galeriaDeFiguras.agregarFigura(figura);
            },
        },
    });

    app.mount('#app');
