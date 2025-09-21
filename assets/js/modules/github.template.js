// Módulo GitHub API - Template
// Copie este arquivo para github.js e adicione seu token se necessário

export async function fetchGitHubStats() {
    try {
        const username = 'danielyvasconcelos';
        
        // Para usar com token (opcional):
        // const token = 'SEU_TOKEN_AQUI';
        // const headers = {
        //     'Authorization': `token ${token}`,
        //     'Accept': 'application/vnd.github.v3+json'
        // };
        
        // Usando API pública (sem token):
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };
        
        const [userResponse, reposResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`, { headers }),
            fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers })
        ]);
        
        if (userResponse.ok && reposResponse.ok) {
            const userData = await userResponse.json();
            const reposData = await reposResponse.json();
            
            // Estatísticas básicas sem token
            const publicRepos = userData.public_repos;
            
            updateStatsDisplay({
                repos: publicRepos,
                commits: 150, // Valor fixo ou calcular de outra forma
                prs: 45      // Valor fixo ou calcular de outra forma
            });
        }
    } catch (error) {
        console.log('Erro na API do GitHub:', error);
        // Fallback com valores fixos
        updateStatsDisplay({
            repos: 25,
            commits: 150,
            prs: 45
        });
    }
}

function updateStatsDisplay(stats) {
    const counters = document.querySelectorAll('.stat__number');
    const labels = document.querySelectorAll('.stat__label');
    
    if (counters.length >= 3) {
        counters[0].textContent = stats.repos;
        counters[1].textContent = stats.commits;
        counters[2].textContent = stats.prs;
        
        labels[0].textContent = 'Repositórios Públicos';
        labels[1].textContent = 'Commits Totais';
        labels[2].textContent = 'Pull Requests';
    }
}